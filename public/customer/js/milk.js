function set_HATEOAS_links() {
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "http://localhost:9001/oms/product-service/milk-brands/get_HATEOAS_links");
	xhttp.send();
	xhttp.onload = function() {
		var response = JSON.parse(this.responseText);
		displayMilkBrands(response._links.link_getAllAvailableMilkBrands.href);
	}
	xhttp.onerror = function() {
		alert("Network Error: Could not send the request. ");
	}
}

function displayMilkBrands(link_getAllAvailableMilkBrands) {
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", link_getAllAvailableMilkBrands);
	xhttp.send();
	xhttp.onload = function() {
		if(xhttp.status == 200){
			var milkBrandsContainerData = JSON.parse(this.responseText);
			var milkBrandBeans = milkBrandsContainerData.milkBrandBeans;
			document.getElementById("div_Content").innerHTML = "";
			document.getElementById("lblMilkBrandsNotAvailable").style.display = "none";

			var tableCellCount = 1;

			var html_table = "<table>";
			for(var index=0; index < milkBrandBeans.length; index++){
				var milkBrandBean = milkBrandBeans[index];
				var milkBrandId = milkBrandBean.milkBrandId;
				var milkBrandName = milkBrandBean.milkBrandName;
				var packaging = milkBrandBean.packaging;
				var price = milkBrandBean.milkBrandInventoryBean.currentPurchasePrice;

				if(tableCellCount == 1){
					html_table = html_table + "<tr>";
				}
				if(tableCellCount == 4){
					html_table = html_table + "</tr>";
					imageAddedCount = 1;
				}
				++tableCellCount;
				html_table = html_table + "<td style='padding-left: 50px; padding-top: 20px; padding-right: 50px; padding-bottom: 13px;'>";
				html_table = html_table + "<label id='lblMilkBrandNamePackaging_" + milkBrandId + "'";
				html_table = html_table + " data='" + milkBrandName + "_" + packaging + "_" + price +  "'>";
				html_table = html_table + milkBrandName + " " + packaging;
				html_table = html_table + "</label>";
				html_table = html_table + "<br><label style='padding-left: 45px;'>₹ " + price + "</label>"
				html_table = html_table + "<br><label style='padding-left: 20px;'>Qty:</label>";
				html_table = html_table + "<input id='txtMilkBrandId_" + milkBrandId + "' style='width:30px;'>";
				html_table = html_table + "<br><label id='lblAddToCart' style='padding-left: 15px; color:blue; cursor:pointer;' ";
				html_table = html_table + "onclick='addToCart(" + milkBrandId + ")'>";
				html_table = html_table + "Add to Cart";
				html_table = html_table + "</label>";
				html_table = html_table + "</td>";
			}
			html_table = html_table + "</table>";
			document.getElementById("div_Content").innerHTML = html_table;
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

const cartMapMilkBrandIdQuantity = new Map();
const cartMapMilkBrandIdMilkBrandProductInfo = new Map();

function addToCart(milkBrandId) {	// milkBrandId 21
	var quantity = document.getElementById("txtMilkBrandId_" + milkBrandId).value;	// 1
	cartMapMilkBrandIdQuantity.set(milkBrandId, quantity);
	var selectedMilkBrandProductInfo = document.getElementById("lblMilkBrandNamePackaging_" + milkBrandId).getAttribute("data");
	if(cartMapMilkBrandIdMilkBrandProductInfo.has(milkBrandId) == false) {
		cartMapMilkBrandIdMilkBrandProductInfo.set(milkBrandId, selectedMilkBrandProductInfo);
		localStorage.setItem("cartMapMilkBrandIdMilkBrandProductInfo", JSON.stringify(Array.from(cartMapMilkBrandIdMilkBrandProductInfo.entries())));
	}
	localStorage.setItem("cartMapMilkBrandIdQuantity", JSON.stringify(Array.from(cartMapMilkBrandIdQuantity.entries())));
	alert("Added to Cart");
}

function showCartItemsDetails() {
	var cartItemsDetailsWindow = window.open("..\\html\\cartItemsDetails.html", "", "width=800,height=800");
}
