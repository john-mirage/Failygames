const tabs = document.getElementsByClassName("tab-list__tab");

function getTabsMinHeight() {
    let minHeight = 0;
    for (let index = 0; index < tabs.length; index++) {
        const tabHeight = tabs[index].offsetHeight
        if (tabHeight > minHeight) minHeight = tabHeight;
    }
    return minHeight;
}


export function setTabsMinHeight() {
    const minHeight = getTabsMinHeight();
    console.log(minHeight)
    for (let index = 0; index < tabs.length; index++) {
        tabs[index].style.minHeight = `${minHeight}px`;
    }
}