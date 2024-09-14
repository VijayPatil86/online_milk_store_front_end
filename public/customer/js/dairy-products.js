function set_HATEOAS_links() {
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "http://localhost:9001/dairy-products/get_HATEOAS_links");
	xhttp.send();
	xhttp.onload = function() {
		var response = JSON.parse(this.responseText);
		displayDairyProducts(response._links.link_getAllAvailableDairyProducts.href);
	}
}

function displayDairyProducts(link_getAllAvailableDairyProducts) {
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
				var categoryName = dairyProduct.dairyProductName;
				
				html_table = html_table + "<tr>";
				html_table = html_table + "<td>" + getImageTagForDairyProductType(categoryName) + "</td>";
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
}