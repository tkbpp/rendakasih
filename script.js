/*
 * script.js
 * JavaScript untuk TK BPP RENDAKASIH
 */

document.addEventListener('DOMContentLoaded', function () {
    // --- Alumni Section Toggle ---
    const alumniButtons = document.querySelectorAll('.alumni-tahun-btn');
    const alumniContents = document.querySelectorAll('.alumni-tahun-content');
    // Prepare alumni modal elements
    const alumniModal = document.getElementById('alumni-modal');
    const alumniModalBody = document.getElementById('alumni-modal-body');
    const alumniModalClose = document.getElementById('alumni-modal-close');

    function openAlumniModal(year) {
        const src = document.getElementById(`alumni-${year}`);
        if (!src) return;

        // Clone the node so we can show it inside modal without moving original
        const clone = src.cloneNode(true);
        clone.style.display = 'block';
        clone.classList.add('in-modal');

        // Clear previous and append
        alumniModalBody.innerHTML = '';
        alumniModalBody.appendChild(clone);

        alumniModal.setAttribute('aria-hidden', 'false');
        alumniModal.style.display = 'flex';

        // prevent background scroll
        document.body.style.overflow = 'hidden';
    }

    function closeAlumniModal() {
        alumniModal.setAttribute('aria-hidden', 'true');
        alumniModal.style.display = 'none';
        alumniModalBody.innerHTML = '';
        document.body.style.overflow = '';
    }

    // Attach listeners to year buttons to open modal
    alumniButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetYear = this.getAttribute('data-year');
            openAlumniModal(targetYear);
        });
    });

    // Close handlers
    alumniModalClose && alumniModalClose.addEventListener('click', closeAlumniModal);
    // Click outside modal box closes it
    alumniModal && window.addEventListener('click', function (event) {
        if (event.target === alumniModal) {
            closeAlumniModal();
        }
    });
    // Close with Escape
    window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            // if video modal exists, leave its logic intact (video modal removes itself)
            if (alumniModal && alumniModal.getAttribute('aria-hidden') === 'false') {
                closeAlumniModal();
            }
        }
    });

    // --- Image Modal (Lightbox) ---
    const photoItems = document.querySelectorAll('.foto-item img');
    const modal = document.getElementById('galeri-modal');
    const modalImg = document.getElementById('galeri-modal-img');
    const closeBtn = document.getElementById('galeri-modal-close');

    photoItems.forEach(item => {
        item.addEventListener('click', function () {
            modal.style.display = "block";
            modalImg.src = this.src;
        });
    });

    closeBtn.addEventListener('click', function () {
        modal.style.display = "none";
    });

    // Close modal if user clicks outside the image
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // --- Video Modal (Lightbox) ---
    const videoPosters = document.querySelectorAll('.yt-poster');
    const body = document.body;

    // Function to create and show the video modal
    function showVideoModal(videoId) {
        // Create the modal HTML structure
        const modalHtml = `
            <div id="video-modal" class="video-modal">
                <span class="video-modal-close" id="video-modal-close">&times;</span>
                <div class="video-content">
                    <iframe id="youtube-iframe"
                            src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&enablejsapi=1&origin=${window.location.origin}"
                            width="100%"
                            height="100%"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                </div>
            </div>
        `;

        // Append to body and display
        body.insertAdjacentHTML('beforeend', modalHtml);
        const videoModal = document.getElementById('video-modal');
        const modalClose = document.getElementById('video-modal-close');

        // Adjust iframe size using padding-bottom technique (CSS handles aspect ratio)
        const iframe = document.getElementById('youtube-iframe');
        iframe.style.height = '100%';

        videoModal.style.display = 'block';

        // Close functionality
        modalClose.addEventListener('click', function () {
            videoModal.remove();
        });

        // Close modal if user clicks outside the video
        window.addEventListener('click', function (event) {
            if (event.target === videoModal) {
                videoModal.remove();
            }
        });
    }

    // Attach click listener to video posters
    videoPosters.forEach(poster => {
        poster.addEventListener('click', function () {
            const videoId = this.getAttribute('data-video-id');
            showVideoModal(videoId);
        });
    });

});

 // --- Mobile hamburger toggle ---
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', String(!expanded));
            navLinks.classList.toggle('show');
        });

        // Close menu when a link is clicked (mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
                if (navLinks.classList.contains('show')) {
                    navLinks.classList.remove('show');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }
});
