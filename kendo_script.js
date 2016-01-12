$(window).load(function(){
var dropdown = $("#dropdown").kendoDropDownList({
    dataSource: [{ text: "", value: "" }],
    dataTextField: "text",
    dataValueField: "value",
    open: function (e) {
        // If the treeview is not visible, then make it visible.
        if (!$treeviewRootElem.hasClass("k-custom-visible")) {
            $treeviewRootElem.slideToggle('fast', function() {
                dropdown.close();
                $treeviewRootElem.addClass("k-custom-visible");
            });
        }
    }
}).data("kendoDropDownList");
var $dropdownRootElem = $(dropdown.element).closest("span.k-dropdown");

var treeview = $("#treeview").kendoTreeView({
    select: function (e) {
        // When a node is selected, display the text for the node in the dropdown and hide the treeview.
        $dropdownRootElem.find("span.k-input").text($(e.node).children("div").text());
        $treeviewRootElem.slideToggle('fast', function() {
            $treeviewRootElem.removeClass("k-custom-visible");
        });
    }
}).data("kendoTreeView");
var $treeviewRootElem = $(treeview.element).closest("div.k-treeview");

// Hide the treeview.
$treeviewRootElem
    .width($dropdownRootElem.width())
    .css({ "border":"1px solid grey", "display": "none", "position": "absolute" });

// Position the treeview so that it is below the dropdown.
$treeviewRootElem
    .css({ "top": $dropdownRootElem.position().top + $dropdownRootElem.height(), "left": $dropdownRootElem.position().left });

$(document).click(function(e) {
    // Ignore clicks on the treetriew.
    if ($(e.target).closest("div.k-treeview").length == 0) {
        // If visible, then close the treeview.
        if ($treeviewRootElem.hasClass("k-custom-visible")) {
            $treeviewRootElem.slideToggle('fast', function() {
                $treeviewRootElem.removeClass("k-custom-visible");
            });
        }
    }
});

});