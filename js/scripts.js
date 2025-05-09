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
        })
        .catch(error => {
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



