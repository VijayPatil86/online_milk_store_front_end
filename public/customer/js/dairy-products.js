function set_HATEOAS_links() {
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "http://localhost:9001/dairy-products/get_HATEOAS_links");
	xhttp.send();
	xhttp.onload = function() {
		var response = JSON.parse(this.responseText);
		displayDairyProducts(response._links.link_getAllAvailableDairyProducts.href);
	}
	xhttp.onerror = function() {
		alert("Network Error: Could not send the request. ");
	}
}

function displayDairyProducts(link_getAllAvailableDairyProducts) {
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", link_getAllAvailableDairyProducts);  
	xhttp.send();
	xhttp.onload = function() {
		if(xhttp.status == 200){
			var dairyProductsContainerData = JSON.parse(this.responseText);
			var dairyProductBeans = dairyProductsContainerData.dairyProductBeans;

			document.getElementById("div_Content").innerHTML = "";
			document.getElementById("lblDairyProductsNotAvailable").style.display = "none";

			var tableCellCount = 1;

			var html_table = "<table>";
			for(var index=0; index < dairyProductBeans.length; index++){
				var dairyProductBean = dairyProductBeans[index];
				var dairyProductName = dairyProductBean.dairyProductName;

				if(tableCellCount == 1){
					html_table = html_table + "<tr>";
				}
				if(tableCellCount == 4){
					html_table = html_table + "</tr>";
					tableCellCount = 1;
				}
				++tableCellCount;
				html_table = html_table + "<td>";
				html_table = html_table + "<a href='..\\html\\milk.html'>";
				html_table = html_table + dairyProductName;
				html_table = html_table + "</a>";
				html_table = html_table + "</td>";
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
