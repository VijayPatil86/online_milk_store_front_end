/** global variables **/
var dairy_ProductId = sessionStorage.getItem('Milk');

function set_HATEOAS_links(){
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "http://localhost:9001/milk-brands/get_HATEOAS_links");
	xhttp.send();
	xhttp.onload = function() {
		var response = JSON.parse(this.responseText);
		document.getElementById("lblGetMilkBrands").data = response._links.link_getAllAvailableMilkBrands.href;
	}
	xhttp.onerror = function() {
		alert("Network Error: Could not send the request. ");
	}
}

function displayMilkBrands(lblGetMilkBrands) {
	var link_getAllAvailableMilkBrands = lblGetMilkBrands.data;
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", link_getAllAvailableMilkBrands);
	xhttp.send();
	xhttp.onload = function() {
		if(xhttp.status == 200){
			var response = JSON.parse(this.responseText);

			/*var dairyProducts = response.dairyProductBeans;
			document.getElementById("div_Content").innerHTML = "";
			document.getElementById("lblDairyProductsNotAvailable").style.display = "none";
			var html_table = "<table>";
			for(var index=0; index < dairyProducts.length; index++){
				var dairyProduct = dairyProducts[index];
				var dairyProductName = dairyProduct.dairyProductName;

				html_table = html_table + "<tr>";
				html_table = html_table + "<td align='center'>" +
					getImageTagForDairyProductType(dairyProductName) + "</td>";
				//var link_getCategoryById = category._links.link_getCategoryById.href;
				html_table = html_table + "</tr>"
			}
			html_table = html_table + "</table>";
			document.getElementById("div_Content").innerHTML = html_table;*/
		}
	    if(xhttp.status == 204) {
			document.getElementById("div_Content").innerHTML = "";
			document.getElementById("lblMilkBrandsNotAvailable").style.display = "block";
	    }
	}
	xhttp.onerror = function() {
		alert("Network Error: Could not send the request. ");
	}
}

function getImageTagForDairyProductType(dairyProductName) {
	var imagePath = "..\\images\\" + dairyProductName + ".JPG";
	return "<a href='..\\html\\milk-brands.html'>" +
		"<img src='" + imagePath + "' title='" + dairyProductName + " " + "' style='cursor: pointer; height: 200px;'>" +
		"<br>" +
		"<label style='cursor:pointer; color:blue;'>" + dairyProductName + " " + "</label>" +
		"</a>";
}

function handleSubmit() {
	var allDataFilled = checkAllFieldsHaveValues();
	if(allDataFilled) {
		var milkBrandName = document.getElementById("txtMilkBrandName").value;
		var milkPackaging = document.getElementById("txtMilkPackaging").value;
		var milkBrandAvailableYes = document.getElementById("radioMilkBrandAvailableYes");
		var milkBrandAvailableNo = document.getElementById("radioMilkBrandAvailableNo");
		var milkBrandAvailable = (milkBrandAvailableYes.checked) ? milkBrandAvailableYes.value : milkBrandAvailableNo.value;

		call_Api_Create_MilkBrand(milkBrandName, milkPackaging, milkBrandAvailable);
	}
	return false;
}

function checkAllFieldsHaveValues() {
	var bRetVal = true;

	var milkBrandName = document.getElementById("txtMilkBrandName").value;
	if(milkBrandName.trim() === '') {
		document.getElementById("lblErrorMessage_MilkBrandNametRequired").style.display = "block";
		bRetVal = false;
	} else {
		document.getElementById("lblErrorMessage_MilkBrandNametRequired").style.display = "none";
	}

	var milkPackaging = document.getElementById("txtMilkPackaging").value;
	if(milkPackaging.trim() === '') {
		document.getElementById("lblErrorMessage_MilkPackagingRequired").style.display = "block";
		bRetVal = false;
	} else {
		document.getElementById("lblErrorMessage_MilkPackagingRequired").style.display = "none";
	}

	var milkBrandAvailableYes = document.getElementById("radioMilkBrandAvailableYes");
	var milkBrandAvailableNo = document.getElementById("radioMilkBrandAvailableNo");
	if(!milkBrandAvailableYes.checked && !milkBrandAvailableNo.checked) {
		document.getElementById("lblErrorMessage_MilkBrandAvailableRequired").style.display = "block";
		bRetVal = false;
	} else {
		document.getElementById("lblErrorMessage_MilkBrandAvailableRequired").style.display = "none";
	}
	return bRetVal;
}

function call_Api_Create_MilkBrand(milkBrandName, milkPackaging, milkBrandAvailable) {
	var data = {
	    milkBrandName: milkBrandName,
		packaging: milkPackaging,
	    milkBrandAvailable: milkBrandAvailable
	};
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "http://localhost:9001/milk-brands/" + dairy_ProductId);
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(JSON.stringify(data));
	xhttp.onload = function() {
		if(xhttp.status == 200){	// success
			var response = JSON.parse(this.responseText);
			alert("Milk Brand " + milkBrandName + ", packaging " + milkPackaging + " created.");
		}
		if(xhttp.status == 409){	// conflict - already exists
			alert("Milk Brand " + milkBrandName + ", packaging " + milkPackaging + " already exists.");
		}
	}
}