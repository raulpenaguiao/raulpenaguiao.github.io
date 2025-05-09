/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

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


// Function to load HTML content into a div
function loadHTMLContent_subpages(pagename) {
    const container = document.getElementById(pagename + "-content");
    fetch("subpages/" + pagename + ".html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load pagename.html");
            }
            return response.text();
        })
        .then(data => {
            // Insert the fetched HTML into the container
            container.innerHTML = data;
        }).then(() => {
            if( pagename == "publications"){
                addPublications();
            }
        }).catch(error => {
            console.error("Error loading " + pagename + ":", error);
            container.innerHTML = "<p>Failed to load " + pagename + " content.</p>";
        });
}
function wrapElement(element, attributes, content) {
    return `<${element} ${attributes}>${content}</${element}>`;
}
function createInnerHTMLPublication(pub) {
    console.log(pub);
    
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
        date = wrapElement("p", '', pub["date"]);
        content += date + "\n";
    }
    content = wrapElement("div", "class='flex-grow-1'", content); 
    
    //clicky image
    on_click_string = "window.open('assets/docs/pub/" + pub["name"] + ".pdf', '_blank')";
    image_toclick = wrapElement("img", "src='assets/img/pub/" + pub["name"] + ".png' alt='Publication Figure' class='img-fluid-article'", "");
    click_image = wrapElement("div", "class='article' onclick='" + on_click_string + "'", image_toclick);
    content += click_image + "\n";

    //wrap up
    answer = wrapElement("div", 'class="d-flex flex-column flex-md-row justify-content-between mb-5"', content);
    console.log(answer);
    return answer;
}

function addPublications(){
    const container = document.getElementById("publications-list");
    console.log(container);
    fetch('assets/publications.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
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

document.addEventListener("DOMContentLoaded", function () {
    loadHTMLContent_subpages("certifications");
    loadHTMLContent_subpages("awards");
    loadHTMLContent_subpages("about");
    loadHTMLContent_subpages("experience");
    loadHTMLContent_subpages("publications");
    loadHTMLContent_subpages("projects");
    loadHTMLContent_subpages("teaching");
    loadHTMLContent_subpages("contacts");
});

document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.getElementById("animation-overlay");

    // Remove the overlay after the animation finishes
    setTimeout(() => {
        overlay.classList.add("fade-out");
    }, 10000); // Match this duration with the animation length
});



