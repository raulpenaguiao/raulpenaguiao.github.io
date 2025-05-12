/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

//#region navbar
window.addEventListener('DOMContentLoaded', event => {
    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
});
//#endregion

//#region animation
document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.getElementById("animation-overlay");

    // Remove the overlay after the animation finishes
    setTimeout(() => {
        overlay.classList.add("fade-out");
    }, 10000); // Match this duration with the animation length
});

//#endregion

//#region dynamic content
function wrapElement(element, attributes, content) {
    return `<${element} ${attributes}>${content}</${element}>`;
}

//#region init
// Function to load HTML content into a div
function loadHTMLContent_subpages(pagename) {
    const container = document.getElementById(pagename + "-content");
    fetch("subpages/" + pagename + ".html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load pagename.html");
            }
            return response.text();
        }).then(data => {
            // Insert the fetched HTML into the container
            container.innerHTML = data;
        }).then(() => {
            if( pagename == "publications"){
                addPublications();
            } else if( pagename == "hobbies"){
                addHobbies();
            } else if( pagename == "talks"){
                addMathTalks();
            }
        }).catch(error => {
            console.error("Error loading " + pagename + ":", error);
            container.innerHTML = "<p>Failed to load " + pagename + " content.</p>";
        });
}

document.addEventListener("DOMContentLoaded", function () {
    loadHTMLContent_subpages("certifications");
    loadHTMLContent_subpages("awards");
    loadHTMLContent_subpages("about");
    loadHTMLContent_subpages("experience");
    loadHTMLContent_subpages("publications");
    loadHTMLContent_subpages("projects");
    loadHTMLContent_subpages("talks");
    loadHTMLContent_subpages("teaching");
    loadHTMLContent_subpages("contacts");
    loadHTMLContent_subpages("hobbies");
});
//#endregion

//#region Math Talks
function addMathTalks()
{
    const container = document.getElementById("math-talks-content");
    fetch('assets/math-talks.json')
        .then(response => response.json())
        .then(data => {
            data["talks"].forEach(talk => {
                // Loop body will go here in next steps
                container.innerHTML += createInnerHTMLMathTalk(talk);
            });
        })
        .catch(error => {
            console.error('Error loading math talks:', error);
            container.innerHTML = '<p>Failed to load math talks.</p>';
        });
}

function createInnerHTMLMathTalk(talk) {
    content = wrapElement("p", "class='talk-name'", talk["title"]);
    talk_content = "";
    talk["venues"].forEach(venue => {
        venue_content = "at " + venue["name"] + ", " + venue["location"] + " - " + venue["date"];
        if (venue["slides-url"]) {
            venue_content += ", see " + wrapElement("a", "class='btn btn-primary' href='https://raulpenaguiao.github.io/" + venue["slides-url"] + "' target='_blank'", "slides");
        }
        if (venue["poster-url"]) {
            venue_content += ", see " + wrapElement("a", "class='btn btn-primary' href='https://raulpenaguiao.github.io/" + venue["poster-url"] + "' target='_blank'", "poster");
        }
        talk_content += wrapElement("li", "class='talk-venue'", venue_content);
    });
    return content + wrapElement("ul", "class='talk-venues'", talk_content);
}
//#endregion Math Talks

//#region hobbies Carousel
function addHobbies()
{
    const containerIndicators = document.getElementById("carouselHobbiesIndicators");
    const containerInner = document.getElementById("carouselHobbiesInner");
    fetch('assets/hobbies.json')
        .then(response => response.json())
        .then(data => {
            counter = 1;
            data["hobbies"].forEach(hobby => {
                // Loop body will go here in next steps
                containerIndicators.innerHTML += createIndicatorsHTMLHobby(counter);
                containerInner.innerHTML += createInnerHTMLHobby(hobby);
                counter++;
            });
        })
        .then(() => {
            containerIndicators.firstElementChild.classList.add('active');
            containerInner.firstElementChild.classList.add('active');
        })
        .catch(error => {
            console.error('Error loading hobbies:', error);
            containerIndicators.innerHTML = '<p>Failed to load hobbies.</p>';
            containerInner.innerHTML = '<p>Failed to load hobbies.</p>';
        });
}

function createIndicatorsHTMLHobby(counter) {
    return '<button type="button" data-bs-target="#carouselHobbies" data-bs-slide-to="' + String(counter) + '"></button>';
}

function createInnerHTMLHobby(hobby) {
    imgElement = wrapElement("img", "src='https://raulpenaguiao.github.io/assets/img/hobbies/" + hobby["file_name"] + "' alt='" + hobby["name"] + "' class='h-100 center-h-div'", "");
    descElement = wrapElement("div", "class='carousel-caption d-none text-block d-md-block'", wrapElement("p", "", hobby["description"]));
    return wrapElement("div", "class='carousel-item force-10-7-ar'", imgElement + descElement);
}
//#endregion

//#region Publications
function createInnerHTMLPublication(pub) {
    //title
    content = "";
    title = wrapElement("h3", "class='mb-0'", pub["title"]);
    if( pub["journal-url"] ) {
        content += wrapElement("a", "href='" + pub["journal-url"] + "'", title) + "\n";
    } else {
        content += title + "\n";
    }

    //authors
    if( pub["other-authors"] && pub["other-authors"].length > 0){
        coauthors = "with ";
        for (let i = 0; i < pub["other-authors"].length; i++) {
            authorName = pub["other-authors"][i]["name"];
            if (pub["other-authors"][i]["url"]) {
                coauthors += wrapElement("a", "href='" + pub["other-authors"][i]["url"] + "'", authorName) + ", ";
            } else {
                coauthors += authorName + ", ";
            }
        }
        // Remove the last comma and space
        coauthors = wrapElement("div", 'class="subheading mb-3"', coauthors.slice(0, -2));
        content += coauthors + "\n";
    }

    //journal
    if( pub["journal"]){
        journal = wrapElement("div", '', pub["journal"]);
        content += journal + "\n";
    }

    //date
    if( pub["date"]){
        date = wrapElement("p", '', "Published on " + pub["date"]);
        if ( pub["arxiv-url"] ) {
            date = wrapElement("a", "href='" + pub["arxiv-url"] + "'", date);
        }
        content += date + "\n";
    }
    content = wrapElement("div", "class='flex-grow-1'", content); 
    
    //clicky image
    on_click_string = "window.open('https://raulpenaguiao.github.io/assets/docs/pub/" + pub["name"] + ".pdf', '_blank')";
    image_toclick = wrapElement("img", "src='https://raulpenaguiao.github.io/assets/img/pub/" + pub["name"] + ".png' alt='Publication Figure' class='img-fluid-article'", "");
    click_image = wrapElement("div", "class='article article-clickable' onclick=" + '"' + on_click_string + '"', image_toclick);
    content += click_image + "\n";

    //wrap up
    answer = wrapElement("div", 'class="d-flex flex-column flex-md-row justify-content-between mb-5"', content);
    return answer;
}
function addPublications(){
    const container = document.getElementById("publications-list");
    fetch('assets/publications.json')
        .then(response => response.json())
        .then(data => {
            data["publications"].forEach(pub => {
                // Loop body will go here in next steps
                container.innerHTML += createInnerHTMLPublication(pub);
            });
        })
        .catch(error => {
            console.error('Error loading publications:', error);
            container.innerHTML = '<p>Failed to load publications.</p>';
        });
}
//#endregion
//#endregion