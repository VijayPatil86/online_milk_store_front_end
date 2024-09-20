function set_HATEOAS_links() {
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "http://localhost:9001/categories/get_HATEOAS_links");
	xhttp.send();
	xhttp.onload = function() {
		var response = JSON.parse(this.responseText);
		document.getElementById("lblGetCategories").data = response._links.link_getAllAvailableCategories.href;
	}
	xhttp.onerror = function() {
		alert("Network Error: Could not send the request. ");
	}
}

function displayCategories(lblGetCategories) {
	var link_getAllAvailableCategories = lblGetCategories.data;
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", link_getAllAvailableCategories);
	xhttp.send();
	xhttp.onload = function() {
		if(xhttp.status == 200){
			var response = JSON.parse(this.responseText);
			var categories = response.categoryBeans;
			document.getElementById("div_Content").innerHTML = "";
			document.getElementById("lblCategoriesNotAvailable").style.display = "none";
			var html_table = "<table border='1' style='border: 1px solid black;border-collapse: collapse;'>";
			html_table = html_table + "<tr>";
			html_table = html_table + "<td align='center' style='width:200px;'>" + 'Category' + "</td>";
			html_table = html_table + "<td align='center' style='width:200px;'>" + 'Available' + "</td>";
			html_table = html_table + "</tr>";
			for(var index=0; index < categories.length; index++){
				var category = categories[index];
				sessionStorage.setItem(category.categoryName, category.categoryId);
				html_table = html_table + "<tr>";
				html_table = html_table + "<td align='center' style='width:200px;'>" + category.categoryName + "</td>";
				html_table = html_table + "<td align='center' style='width:200px;'>" + category.categoryAvailable + "</td>";
				html_table = html_table + "<td align='center' style='width:200px;'>" +
					"<a href='..\\html\\dairy-products.html'>" + "Add Products" + "</a>"
					+ "</td>";
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
	xhttp.onerror = function() {
		alert("Network Error: Could not send the request. ");
	}
}

function handleSubmit() {
	var allDataFilled = checkAllFieldsHaveValues();
	if(allDataFilled) {
		var categoryName = document.getElementById("txtCategoryName").value;
		var categoryAvailableYes = document.getElementById("radioCategoryAvailableYes");
		var categoryAvailableNo = document.getElementById("radioCategoryAvailableNo");
		var categoryAvailable = (categoryAvailableYes.checked) ? categoryAvailableYes.value : categoryAvailableNo.value;

		call_Api_Create_Category(categoryName, categoryAvailable);
	}
	return false;
}

function checkAllFieldsHaveValues() {
	var bRetVal = true;

	var categoryName = document.getElementById("txtCategoryName").value;
	if(categoryName.trim() === '') {
		document.getElementById("lblErrorMessage_CategoryNameRequired").style.display = "block";
		bRetVal = false;
	} else {
		document.getElementById("lblErrorMessage_CategoryNameRequired").style.display = "none";
	}

	var categoryAvailableYes = document.getElementById("radioCategoryAvailableYes");
	var categoryAvailableNo = document.getElementById("radioCategoryAvailableNo");
	if(!categoryAvailableYes.checked && !categoryAvailableNo.checked) {
		document.getElementById("lblErrorMessage_CategoryAvailableRequired").style.display = "block";
		bRetVal = false;
	} else {
		document.getElementById("lblErrorMessage_CategoryAvailableRequired").style.display = "none";
	}
	return bRetVal;
}

function call_Api_Create_Category(categoryName, categoryAvailable) {
	var data = {
	    categoryName: categoryName,
	    categoryAvailable: categoryAvailable
	};
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "http://localhost:9001/categories");
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(JSON.stringify(data));
	xhttp.onload = function() {
		if(xhttp.status == 200){	// success
			alert("Category " + categoryName + " created.");
		}
		if(xhttp.status == 409){	// conflict - already exists
			alert("Category " + categoryName + " already exists.");
		}
	}
}