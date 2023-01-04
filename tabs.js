//Click on tab and get what you want from it
//We use tab list using role and aria-label
//in HTML and CSS
//Using proper markup helps with accessibility
//We use role to tell them it's a tablist
//aria-selected tells us whether it selected or not
//aria-label is for markup on browswer
//<div> with attribute 'hidden' hides it

const tabs = document.querySelector('.tabs');
const tabButtons = tabs.querySelectorAll('[role="tab"]');
const tabPanels = Array.from(tabs.querySelectorAll('[role="tabpanel"]'));

//Select tab buttons and listen on each for click event
tabButtons.forEach(button => button.addEventListener('click', handleTabClick));

//
function handleTabClick(e) {
  // console.log(e.currentTarget); //returns event whose listeners triggered event
  
  //when someone clicks on a tab, we want to hide all other panels
  //we also want to mark all tabs as unselected
  //and mark the clicked tab as selected
  //we also need to find associated tab panel and show it

  //where to find all tab panels?
  // console.log(tabPanels);//shows us all tab panels--NodeList(3)[div, div, div]
  //now we want to find each panel and hide the rest
  tabPanels.forEach(function(panel) {
    panel.hidden = true;
  });
  //now we want to hide the buttons too
  tabButtons.forEach(function(tab){
    tab.setAttribute('aria-selected', false);//aria-selected is turned to camelCase automatically but we can't set it so we have to use setAttribute
  });

  //now we want to show the button and tab panel we selected
  e.currentTarget.setAttribute('aria-selected', true);
  //and find associated tab panel and show it
  //first lets grab currentTarget's ID
  const { id }= e.currentTarget;
  //then lets find the matching class in css using a dynamic selector
  //METHOD 1
  // const tabPanel = tabs.querySelector(`[aria-labelledby="${id}"]`);//find 
  // tabPanel.hidden = false;
  
  //METHOD 2--Using find (find only works on arrays not NodeList)
  //find in array of tab panels, so first we have to convert it to an array
  //we can conver it to an array where we initially defined tabPanels at top using Array.from()
  const tabPanel = tabPanels.find(panel =>
  // We can use the implicit true return so we don't have to write out entire conditional
  //   if (panel.getAttribute('aria-labelledby') === id) {
  //     return true;
  //   }
  // });
  panel.getAttribute('aria-labelledby') === id //alternative way to write conditional
  );
  tabPanel.hidden = false; //we define and grab the tabPanel
};
