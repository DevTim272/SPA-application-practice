import DashBoard from "./views/DashBoard.js";
import Posts from "./views/Posts.js";
import PostView from "./views/PostsView.js";
import Settings from "./views/Settings.js";
const navigateTo = url => {
    history.pushState(null, null, url);
    router()
} 

const router = async () => {
    const routes = [
        {path: "/", view: DashBoard},
        { path: "/posts", view: Posts },
        { path: "/posts/:id", view: PostView },
        { path: "/settings", view: Settings }
    ];
    // Test each route for potential matches
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        }
    });
    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch)

    if(!match) { 
        match = {
            route: routes[0],
            isMatch: true
        }
    }
    const view = new match.route.view()
    document.querySelector("#app").innerHTML = await view.getHtml()
    
    
};
window.addEventListener('popstate', router())
document.addEventListener('DOMContentLoaded', (e) => {
    document.body.addEventListener('click', e => {
        if(e.target.matches("[data-link]")){
            e.preventDefault();
            navigateTo(e.target.href)
        }
    })
    
    e.preventDefault()

    router()
} )
