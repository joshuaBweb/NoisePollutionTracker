document.getElementById('post-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var noise = document.getElementById('noise').value;
    var location = document.getElementById('location').value;
    var description = document.getElementById('description').value;

    var post = createPost(noise, location, description);

    document.getElementById('blog-posts').appendChild(post);
});

// Function to create a post element
function createPost(noise, location, description) {
    var post = document.createElement('div');
    post.classList.add('post');

    var postNoise = document.createElement('h2');
    postNoise.textContent = 'Noise: ' + noise;

    var postLocation = document.createElement('h3');
    postLocation.textContent = 'Location: ' + location;

    var postDescription = document.createElement('p');
    postDescription.textContent = description;

    post.appendChild(postNoise);
    post.appendChild(postLocation);
    post.appendChild(postDescription);

    return post;
}
