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
    const animSection = document.getElementById("animation");
    if (!overlay) return;

    // Remove the overlay after the animation finishes
    const fadeOut = () => overlay.classList.add("fade-out");
    setTimeout(fadeOut, 10000);

    // Also dismiss immediately when user scrolls away from the animation section
    if (animSection) {
        const observer = new IntersectionObserver((entries) => {
            if (!entries[0].isIntersecting) {
                fadeOut();
                observer.disconnect();
            }
        }, { threshold: 0.1 });
        observer.observe(animSection);
    }
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
            let indicatorsHtml = '';
            let innerHtml = '';
            data["hobbies"].forEach((hobby, i) => {
                indicatorsHtml += createIndicatorsHTMLHobby(i);
                innerHtml += createInnerHTMLHobby(hobby);
            });
            containerIndicators.innerHTML = indicatorsHtml;
            containerInner.innerHTML = innerHtml;
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
    const imgUrl = "https://raulpenaguiao.github.io/assets/img/hobbies/" + hobby["file_name"];
    const bgElement = wrapElement("div", "class='carousel-bg' style=\"background-image: url('" + imgUrl + "')\"", "");
    const imgElement = wrapElement("img", "src='" + imgUrl + "' alt='" + hobby["name"] + "' class='carousel-main-img'", "");
    const descElement = wrapElement("div", "class='carousel-caption d-none text-block d-md-block'", wrapElement("p", "", hobby["description"]));
    return wrapElement("div", "class='carousel-item force-10-7-ar'", bgElement + imgElement + descElement);
}
//#endregion

//#region Publications
function createInnerHTMLPublication(pub) {
    // top accent stripe
    let card = wrapElement("div", "class='pub-card-accent'", "");

    // equation image area
    const imgSrc = "https://raulpenaguiao.github.io/assets/img/pub/" + pub["name"] + ".svg";
    const onClickPDF = "window.open('https://raulpenaguiao.github.io/assets/docs/pub/" + pub["name"] + ".pdf', '_blank')";
    const img = wrapElement("img", "src='" + imgSrc + "' alt='Publication Figure'", "");
    card += wrapElement("div", "class='pub-card-img' onclick=\"" + onClickPDF + "\"", img);

    // body
    let body = "";

    // title
    let titleText = pub["title"];
    if (pub["journal-url"]) {
        titleText = wrapElement("a", "href='" + pub["journal-url"] + "' target='_blank'", titleText);
    }
    body += wrapElement("div", "class='pub-card-title'", titleText);

    // authors
    if (pub["other-authors"] && pub["other-authors"].length > 0) {
        let authorsText = "with ";
        pub["other-authors"].forEach((author, i) => {
            const name = author["url"]
                ? wrapElement("a", "href='" + author["url"] + "' target='_blank'", author["name"])
                : author["name"];
            authorsText += name + (i < pub["other-authors"].length - 1 ? ", " : "");
        });
        body += wrapElement("div", "class='pub-card-authors'", authorsText);
    }

    // journal
    if (pub["journal"]) {
        body += wrapElement("div", "class='pub-card-journal'", pub["journal"]);
    }

    // links row
    let links = "";
    if (pub["arxiv-url"]) {
        links += wrapElement("a", "class='pub-card-link' href='" + pub["arxiv-url"] + "' target='_blank'", "arXiv");
    }
    links += wrapElement("a", "class='pub-card-link' href='javascript:void(0)' onclick=\"" + onClickPDF + "\"", "PDF");
    body += wrapElement("div", "class='pub-card-links'", links);

    card += wrapElement("div", "class='pub-card-body'", body);
    return wrapElement("div", "class='pub-card'", card);
}
function addPublications(){
    const container = document.getElementById("publications-grid");
    fetch('assets/publications.json')
        .then(response => response.json())
        .then(data => {
            data["publications"].forEach(pub => {
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