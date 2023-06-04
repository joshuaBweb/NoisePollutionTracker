document.getElementById('blog-post-form').addEventListener('submit', function(e) {
    e.preventDefault();

    var title = document.getElementById('title').value;
    var content = document.getElementById('content').value;

    var postElement = document.createElement('div');
    postElement.innerHTML = `<h2>${title}</h2><p>${content}</p>`;

    document.getElementById('posts').appendChild(postElement);

    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
});
