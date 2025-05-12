from flask import Flask, render_template, jsonify, request
import json

app = Flask(__name__)

# Helper function to wrap HTML elements
def wrap_element(element, attributes, content):
    return f"<{element} {attributes}>{content}</{element}>"

# Load HTML content for subpages
def load_html_content_subpages(pagename):
    try:
        with open(f"subpages/{pagename}.html", "r", encoding="utf-8") as file:
            return file.read()
    except FileNotFoundError:
        return f"<p>Failed to load {pagename} content.</p>"

# Add Math Talks
def add_math_talks():
    try:
        with open("assets/math-talks.json", "r", encoding="utf-8") as file:
            data = json.load(file)
        talks_html = ""
        for talk in data["talks"]:
            talks_html += create_inner_html_math_talk(talk)
        return talks_html
    except Exception as e:
        print(f"Error loading math talks: {e}")
        return "<p>Failed to load math talks.</p>"

def create_inner_html_math_talk(talk):
    content = wrap_element("p", "class='talk-name'", talk["title"])
    talk_content = ""
    for venue in talk["venues"]:
        venue_content = f"at {venue['name']}, {venue['location']} - {venue['date']}"
        if "slides-url" in venue:
            venue_content += f", see {wrap_element('a', \"class='btn btn-primary' href='{}' target='_blank'\".format(venue['slides-url']), 'slides')}"
        if "poster-url" in venue:
            venue_content += f", see {wrap_element('a', \"class='btn btn-primary' href='{}' target='_blank'\".format(venue['poster-url']), 'poster')}"
        talk_content += wrap_element("li", "class='talk-venue'", venue_content)
    return content + wrap_element("ul", "class='talk-venues'", talk_content)

# Add Hobbies
def add_hobbies():
    try:
        with open("assets/hobbies.json", "r", encoding="utf-8") as file:
            data = json.load(file)
        indicators_html = ""
        inner_html = ""
        counter = 0
        for hobby in data["hobbies"]:
            indicators_html += create_indicators_html_hobby(counter)
            inner_html += create_inner_html_hobby(hobby)
            counter += 1
        return indicators_html, inner_html
    except Exception as e:
        print(f"Error loading hobbies: {e}")
        return "<p>Failed to load hobbies.</p>", "<p>Failed to load hobbies.</p>"

def create_indicators_html_hobby(counter):
    return f'<button type="button" data-bs-target="#carouselHobbies" data-bs-slide-to="{counter}"></button>'

def create_inner_html_hobby(hobby):
    img_element = wrap_element("img", f"src='assets/img/hobbies/{hobby['file_name']}' alt='{hobby['name']}' class='h-100 center-h-div'", "")
    desc_element = wrap_element("div", "class='carousel-caption d-none text-block d-md-block'", wrap_element("p", "", hobby["description"]))
    return wrap_element("div", "class='carousel-item force-10-7-ar'", img_element + desc_element)

# Add Publications
def add_publications():
    try:
        with open("assets/publications.json", "r", encoding="utf-8") as file:
            data = json.load(file)
        publications_html = ""
        for pub in data["publications"]:
            publications_html += create_inner_html_publication(pub)
        return publications_html
    except Exception as e:
        print(f"Error loading publications: {e}")
        return "<p>Failed to load publications.</p>"

def create_inner_html_publication(pub):
    content = ""
    title = wrap_element("h3", "class='mb-0'", pub["title"])
    if "journal-url" in pub:
        content += wrap_element("a", f"href='{pub['journal-url']}'", title) + "\n"
    else:
        content += title + "\n"

    if "other-authors" in pub and pub["other-authors"]:
        coauthors = "with "
        for author in pub["other-authors"]:
            author_name = author["name"]
            if "url" in author:
                coauthors += wrap_element("a", f"href='{author['url']}'", author_name) + ", "
            else:
                coauthors += author_name + ", "
        coauthors = wrap_element("div", 'class="subheading mb-3"', coauthors.rstrip(", "))
        content += coauthors + "\n"

    if "journal" in pub:
        journal = wrap_element("div", "", pub["journal"])
        content += journal + "\n"

    if "date" in pub:
        date = wrap_element("p", "", f"Published on {pub['date']}")
        if "arxiv-url" in pub:
            date = wrap_element("a", f"href='{pub['arxiv-url']}'", date)
        content += date + "\n"

    content = wrap_element("div", "class='flex-grow-1'", content)

    on_click_string = f"window.open('assets/docs/pub/{pub['name']}.pdf', '_blank')"
    image_toclick = wrap_element("img", f"src='assets/img/pub/{pub['name']}.png' alt='Publication Figure' class='img-fluid-article'", "")
    click_image = wrap_element("div", f"class='article article-clickable' onclick=\"{on_click_string}\"", image_toclick)
    content += click_image + "\n"

    return wrap_element("div", 'class="d-flex flex-column flex-md-row justify-content-between mb-5"', content)

# Flask Routes
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/subpages/<pagename>")
def subpages(pagename):
    return load_html_content_subpages(pagename)

@app.route("/math-talks")
def math_talks():
    return add_math_talks()

@app.route("/hobbies")
def hobbies():
    indicators, inner = add_hobbies()
    return jsonify({"indicators": indicators, "inner": inner})

@app.route("/publications")
def publications():
    return add_publications()

if __name__ == "__main__":
    app.run(debug=True)