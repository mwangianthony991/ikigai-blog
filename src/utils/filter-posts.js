import { convertStringToTitleCase } from './string-formats';


function filterPosts(posts, postCategory) {
    postCategory = convertStringToTitleCase(postCategory)
    return posts.filter(post => post.category === postCategory)
}

function getPostCategories(posts) {
    let categories = ["All"];
    for (let i = 0; i < posts.length; i++) {
        let category = convertStringToTitleCase(posts[i].category);
        if (!categories.includes(category)) {
            categories.push(category)
        }
    }
    return categories;
}

export {filterPosts, getPostCategories};
