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
            if (!modal || !modalImg) return;
            modal.style.display = "block";
            modalImg.src = this.src;
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn && closeBtn.addEventListener('click', function () {
        if (!modal) return;
        modal.style.display = "none";
        document.body.style.overflow = '';
    });

    // Close modal if user clicks outside the image
    window.addEventListener('click', function (event) {
        if (modal && event.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = '';
        }
    });

    // --- Video Modal (Lightbox) ---
    const videoPosters = document.querySelectorAll('.yt-poster');
    const body = document.body;

    // Function to create and show the video modal
    function showVideoModal(videoId) {
        if (!videoId) return;

        // Create the modal HTML structure
        const modalHtml = `
            <div id="video-modal" class="video-modal" aria-hidden="false">
                <button class="video-modal-close" id="video-modal-close" aria-label="Tutup">&times;</button>
                <div class="video-content">
                    <iframe id="youtube-iframe"
                            src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&enablejsapi=1"
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

        if (!videoModal) return;

        // show as flex-centered (CSS handles centering); prevent background scroll
        videoModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        // Close functionality: remove modal and restore scroll
        const removeModal = () => {
            if (videoModal) videoModal.remove();
            document.body.style.overflow = '';
        };

        modalClose && modalClose.addEventListener('click', removeModal);

        // Close modal if user clicks on backdrop (videoModal)
        videoModal.addEventListener('click', function (event) {
            if (event.target === videoModal) {
                removeModal();
            }
        });

        // Also handle Escape key while modal exists
        function onKey(e) {
            if (e.key === 'Escape') removeModal();
        }
        window.addEventListener('keydown', onKey, { once: true });
    }

    // Attach click listener to video posters
    videoPosters.forEach(poster => {
        poster.addEventListener('click', function () {
            const videoId = this.getAttribute('data-video-id');
            showVideoModal(videoId);
        });
    });

   // --- Mobile hamburger toggle ---
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    function toggleMenu(show) {
        if (navToggle && navLinks) {
            navToggle.setAttribute('aria-expanded', String(show));
            navLinks.classList.toggle('show', show);
            // Prevent scroll when menu is open
            document.body.style.overflow = show ? 'hidden' : '';
        }
    }

    if (navToggle && navLinks) {
        // Toggle menu on button click
        navToggle.addEventListener('click', function (e) {
            e.preventDefault();
            const willShow = this.getAttribute('aria-expanded') !== 'true';
            toggleMenu(willShow);
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (navLinks.classList.contains('show') &&
                !navLinks.contains(e.target) &&
                !navToggle.contains(e.target)) {
                toggleMenu(false);
            }
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
                toggleMenu(false);
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navLinks.classList.contains('show')) {
                toggleMenu(false);
            }
        });
    }
});
