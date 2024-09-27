function loadCartItemsDetails() {
	var cartData = localStorage.getItem("cartMapMilkBrandIdQuantity");
	if (cartData) {
		var entries = JSON.parse(cartData);
		var cartMapMilkBrandIdQuantity = new Map(entries);
		var cartProductInfoData = localStorage.getItem("cartMapMilkBrandIdMilkBrandProductInfo");
		var entriesSelectedProductInfo = JSON.parse(cartProductInfoData);
		var cartMapMilkBrandIdMilkBrandProductInfo = new Map(entriesSelectedProductInfo);
		//alert(JSON.stringify(Array.from(cartMapMilkBrandIdMilkBrandProductInfo.entries())));
		var table_SelectedProductInfo = "<table style='border-collapse: collapse; border: 1px solid black;'>";
		table_SelectedProductInfo += "<tr>";
		table_SelectedProductInfo += "<th style='border: 1px solid black;'>" + "Product Name" + "</th>";
		table_SelectedProductInfo += "<th style='border: 1px solid black;'>" + "Packaging" + "</th>";
		table_SelectedProductInfo += "<th style='border: 1px solid black;'>" + "Price" + "</th>";
		table_SelectedProductInfo += "<th style='border: 1px solid black;'>" + "Quantity" + "</th>";
		table_SelectedProductInfo += "<th style='border: 1px solid black;'>" + "Amount" + "</th>";
		table_SelectedProductInfo += "<th style='border: 1px solid black;'>" + "Availability" + "</th>";
		table_SelectedProductInfo += "<th style='border: 1px solid black;'>" + "Order Upto" + "</th>";
		table_SelectedProductInfo += "</tr>";
		var totalAmount = 0;
		cartMapMilkBrandIdQuantity.forEach((quantity, milkBrandId) => {
			var imageAvailability = "..\\images\\Tick_Mark_Circle-Green.webp";
			table_SelectedProductInfo += "<tr>";
			var selectedProductInfo = cartMapMilkBrandIdMilkBrandProductInfo.get(milkBrandId);	// Warana_250 ML_20
			var splitSelectedProductInfo = selectedProductInfo.split("_");
			table_SelectedProductInfo += "<td style='border: 1px solid black; font-size: large'>" + splitSelectedProductInfo[0] + "</td>";
			table_SelectedProductInfo += "<td style='border: 1px solid black; font-size: large'>" + splitSelectedProductInfo[1] + "</td>";
			table_SelectedProductInfo += "<td align='center' style='border: 1px solid black; font-size: large'>" + splitSelectedProductInfo[2] + "</td>";
			table_SelectedProductInfo += "<td align='center' style='border: 1px solid black; font-size: large'>" + quantity + "</td>";
			table_SelectedProductInfo += "<td align='right' style='border: 1px solid black; font-size: large'>" + (quantity * splitSelectedProductInfo[2]) + "</td>";
			table_SelectedProductInfo += "<td align='center' style='border: 1px solid black; font-size: large'>";
			table_SelectedProductInfo += "<img id='imgAvailability_" + milkBrandId + "' src='" + imageAvailability + "' style='height:30px; width:30px;'>" + "</td>";
			table_SelectedProductInfo += "<td id='cell_" + milkBrandId + "' style='border: 1px solid black; font-size: large'></td>";
			table_SelectedProductInfo += "</tr>";
			totalAmount += quantity * splitSelectedProductInfo[2];
		});
		table_SelectedProductInfo += "<tr>";
		table_SelectedProductInfo += "<th align='right' colspan='4' style='border: 1px solid black; font-size: large'>";
		table_SelectedProductInfo += "Total Amount:";
		table_SelectedProductInfo += "</th>";
		table_SelectedProductInfo += "<th align='right' style='border: 1px solid black; font-size: large'>";
		table_SelectedProductInfo += totalAmount;
		table_SelectedProductInfo += "</th>";
		table_SelectedProductInfo += "</tr>";
		table_SelectedProductInfo += "</table>";
		document.getElementById("div_Content").innerHTML = table_SelectedProductInfo;
		checkSelectedProductsAvailability(cartMapMilkBrandIdQuantity)
			.then(map => {
				map.forEach((value, key) => {
					document.getElementById('imgAvailability_'+key).src="..\\images\\Cross_Mark_Circle-Red.jpg";
					document.getElementById('imgAvailability_'+key).style="height:20px; width:20px;";
					document.getElementById('cell_'+key).innerHTML = value;
				});
			});
	} else {
		alert("No items in the cart.");
	}
}

function closeWindow() {
	window.close();
}

function checkSelectedProductsAvailability(cartMapMilkBrandIdQuantity) {
	return new Promise((resolve, reject) => {
		var queryParams = "";
		cartMapMilkBrandIdQuantity.forEach((quantity, milkBrandId) => {
			queryParams += milkBrandId + "=" + quantity + "&";
		});
		if (queryParams.endsWith('&')) {
		    queryParams = queryParams.slice(0, -1);
		}
		var mapMilkBrandIdQuantityAvailable = new Map();
		var url_checkSelectedProductsAvailability=
			"http://localhost:9003/oms/inventory-service/inventory/milk-brand?" + queryParams;	// queryParams 21=2&22=4
		var xhttp = new XMLHttpRequest();
			xhttp.open("GET", url_checkSelectedProductsAvailability);
			xhttp.send();
			xhttp.onload = function() {
				if(xhttp.status == 200){
					var responseProductIdsQuantitiesAvailable = JSON.parse(this.responseText);
					// 	21_36,22_26	length=2
					if(responseProductIdsQuantitiesAvailable.length > 0) {
						var stringProductIdsQuantitiesAvailable = responseProductIdsQuantitiesAvailable.toString();
						var arrResponseProductIdsQuantitiesAvailable = stringProductIdsQuantitiesAvailable.split(',');
						arrResponseProductIdsQuantitiesAvailable.forEach(productIdQuantityAvailable => {
							var arrProductIdQuantityAvailable = productIdQuantityAvailable.split('_');
							var productId = arrProductIdQuantityAvailable[0];
							var productQuantityAvailable = arrProductIdQuantityAvailable[1];
							mapMilkBrandIdQuantityAvailable.set(productId, productQuantityAvailable);
						});
					}
					resolve(mapMilkBrandIdQuantityAvailable);
				}
			}
			xhttp.onerror = function() {
				alert("Network Error: Could not send the request. ");
			}
	});
}
