function set_HATEOAS_links() {
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "http://localhost:9001/categories/get_HATEOAS_links");
	xhttp.send();
	xhttp.onload = function() {
		var response = JSON.parse(this.responseText);
		displayCategories(response._links.link_getAllAvailableCategories.href);
	}
}

function getImageTagForCategoryType(categoryName) {
	switch(categoryName) {
		case "Dairy":  {
			return "<a href='..\\html\\dairy-products.html'>" + 
				"<img src='..\\images\\Dairy.jpg\' title='Dairy Products' style='cursor: pointer;'>" + 
				"<br>" +
				"<label style='padding-left: 110px; cursor:pointer; color:blue;'>Dairy Products</label>" +
				"</a>";
		}
	}
}

function displayCategories(link_getAllAvailableCategories) {
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", link_getAllAvailableCategories);  
	xhttp.send();
	xhttp.onload = function() {
		if(xhttp.status == 200){
			var response = JSON.parse(this.responseText);
			var categories = response.categoryBeans;
			document.getElementById("div_Content").innerHTML = "";
			document.getElementById("lblCategoriesNotAvailable").style.display = "none";
			var html_table = "<table>";
			for(var index=0; index < categories.length; index++){
				var category = categories[index];
				var categoryName = category.categoryName;
				
				html_table = html_table + "<tr>";
				html_table = html_table + "<td>" + getImageTagForCategoryType(categoryName) + "</td>";
				//var link_getCategoryById = category._links.link_getCategoryById.href;
				html_table = html_table + "</tr>"
			}
			html_table = html_table + "</table>";
			document.getElementById("div_Content").innerHTML = html_table;
		}
	    if(xhttp.status == 204) {
	    	document.getElementById("div_Content").innerHTML = "";
	    	document.getElementById("lblCategoriesNotAvailable").style.display = "block";
	    }
	}
}