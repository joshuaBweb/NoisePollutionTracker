document.getElementById('post-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var noise = document.getElementById('noise').value;
    var location = document.getElementById('location').value;
    var description = document.getElementById('description').value;

    var post = createPost(noise, location, description);

    document.getElementById('blog-posts').appendChild(post);

    // Save the post data to localStorage
    //var posts = JSON.parse(localStorage.getItem('posts')) || [];
    //posts.push({noise: noise, location: location, description: description});
    //localStorage.setItem('posts', JSON.stringify(posts));
//
    //document.getElementById('noise').value = '';
    //document.getElementById('location').value = '';
    //document.getElementById('description').value = '';
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

// Function to load posts from localStorage
//function loadPosts() {
//    var posts = JSON.parse(localStorage.getItem('posts')) || [];
//
//    for (var i = 0; i < posts.length; i++) {
//        var post = createPost(posts[i].noise, posts[i].location, posts[i].description);
//        document.getElementById('blog-posts').appendChild(post);
//    }
//}
//
// Load posts when the page loads
//loadPosts();
