/** global variables **/
var dairy_CategoryId = sessionStorage.getItem('Dairy');

function set_HATEOAS_links(){
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "http://localhost:9001/dairy-products/get_HATEOAS_links");
	xhttp.send();
	xhttp.onload = function() {
		var response = JSON.parse(this.responseText);
		document.getElementById("lblGetDairyProducts").data = response._links.link_getAllAvailableDairyProducts.href;
	}
	xhttp.onerror = function() {
		alert("Network Error: Could not send the request. ");
	}
}

function displayDairyProducts(lblGetDairyProducts) {
	var link_getAllAvailableDairyProducts = lblGetDairyProducts.data;
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", link_getAllAvailableDairyProducts);
	xhttp.send();
	xhttp.onload = function() {
		if(xhttp.status == 200){
			var response = JSON.parse(this.responseText);
			var dairyProducts = response.dairyProductBeans;
			document.getElementById("div_Content").innerHTML = "";
			document.getElementById("lblDairyProductsNotAvailable").style.display = "none";
			var html_table = "<table>";
			for(var index=0; index < dairyProducts.length; index++){
				var dairyProduct = dairyProducts[index];
				var dairyProductName = dairyProduct.dairyProductName;

				html_table = html_table + "<tr>";
				html_table = html_table + "<td align='center'>" + getImageTagForDairyProductType(dairyProductName) + "</td>";
				//var link_getCategoryById = category._links.link_getCategoryById.href;
				html_table = html_table + "</tr>"
			}
			html_table = html_table + "</table>";
			document.getElementById("div_Content").innerHTML = html_table;
		}
	    if(xhttp.status == 204) {
			document.getElementById("div_Content").innerHTML = "";
			document.getElementById("lblDairyProductsNotAvailable").style.display = "block";
	    }
	}
	xhttp.onerror = function() {
		alert("Network Error: Could not send the request. ");
	}
}

function getImageTagForDairyProductType(dairyProductName) {
	var imagePath = "..\\images\\" + dairyProductName + ".JPG";
	return "<img src='" + imagePath + "' title='" + dairyProductName + " " + "' style='cursor: pointer; height: 200px;'>" +
			"<br>" +
			"<label style='cursor:pointer; color:blue;'>" + dairyProductName + " " + "</label>";
}

function handleSubmit() {
	var allDataFilled = checkAllFieldsHaveValues();
	if(allDataFilled) {
		var dairyProductName = document.getElementById("txtDairyProductName").value;
		var dairyProductAvailableYes = document.getElementById("radioDairyProductAvailableYes");
		var dairyProductAvailableNo = document.getElementById("radioDairyProductAvailableNo");
		var dairyProductAvailable = (dairyProductAvailableYes.checked) ? dairyProductAvailableYes.value : dairyProductAvailableNo.value;

		call_Api_Create_DairyProduct(dairyProductName, dairyProductAvailable);
	}
	return false;
}

function checkAllFieldsHaveValues() {
	var bRetVal = true;

	var dairyProductName = document.getElementById("txtDairyProductName").value;
	if(dairyProductName.trim() === '') {
		document.getElementById("lblErrorMessage_DairyProducNametRequired").style.display = "block";
		bRetVal = false;
	} else {
		document.getElementById("lblErrorMessage_DairyProducNametRequired").style.display = "none";
	}

	var dairyProductAvailableYes = document.getElementById("radioDairyProductAvailableYes");
	var dairyProductAvailableNo = document.getElementById("radioDairyProductAvailableNo");
	if(!dairyProductAvailableYes.checked && !dairyProductAvailableNo.checked) {
		document.getElementById("lblErrorMessage_DairyProductAvailableRequired").style.display = "block";
		bRetVal = false;
	} else {
		document.getElementById("lblErrorMessage_DairyProductAvailableRequired").style.display = "none";
	}
	return bRetVal;
}

function call_Api_Create_DairyProduct(dairyProductName, dairyProductAvailable) {
	var data = {
	    dairyProductName: dairyProductName,
	    dairyProductAvailable: dairyProductAvailable
	};
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "http://localhost:9001/dairy-products/" + dairy_CategoryId);
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(JSON.stringify(data));
	xhttp.onload = function() {
		if(xhttp.status == 200){	// success
			var response = JSON.parse(this.responseText);
			sessionStorage.setItem(response.dairyProductBean.dairyProductName, response.dairyProductBean.dairyProductId);
			alert("Dairy Product " + dairyProductName + " created.");
		}
		if(xhttp.status == 409){	// conflict - already exists
			alert("Dairy Product " + dairyProductName + " already exists.");
		}
	}
}