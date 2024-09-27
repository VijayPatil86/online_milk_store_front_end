function loadCartItemsDetails() {
	var cartData = localStorage.getItem("cartMapMilkBrandIdQuantity");
	if (cartData) {
		var entries = JSON.parse(cartData);
		var cartMapMilkBrandIdQuantity = new Map(entries);

		checkSelectedProductsAvailability(cartMapMilkBrandIdQuantity);
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
		table_SelectedProductInfo += "</tr>";
		var totalAmount = 0;
		cartMapMilkBrandIdQuantity.forEach((quantity, milkBrandId) => {
			table_SelectedProductInfo += "<tr>";
			var selectedProductInfo = cartMapMilkBrandIdMilkBrandProductInfo.get(milkBrandId);	// Warana_250 ML_20
			var splitSelectedProductInfo = selectedProductInfo.split("_");
			table_SelectedProductInfo += "<td style='border: 1px solid black; font-size: large'>" + splitSelectedProductInfo[0] + "</td>";
			table_SelectedProductInfo += "<td style='border: 1px solid black; font-size: large'>" + splitSelectedProductInfo[1] + "</td>";
			table_SelectedProductInfo += "<td align='center' style='border: 1px solid black; font-size: large'>" + splitSelectedProductInfo[2] + "</td>";
			table_SelectedProductInfo += "<td align='center' style='border: 1px solid black; font-size: large'>" + quantity + "</td>";
			table_SelectedProductInfo += "<td align='right' style='border: 1px solid black; font-size: large'>" + (quantity * splitSelectedProductInfo[2]) + "</td>";
			table_SelectedProductInfo += "<td align='center' style='border: 1px solid black; font-size: large'>";
			table_SelectedProductInfo += "<img id='imgAvailability' src='..\\images\\Tick_Mark_Circle-Green.webp' style='height:30px; width:30px;'>";
			table_SelectedProductInfo += "</td>";
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
	} else {
		alert("No items in the cart.");
	}
}

function closeWindow() {
	localStorage.removeItem("cartMapMilkBrandIdQuantity");
	localStorage.removeItem("cartMapMilkBrandIdMilkBrandProductInfo");
	window.close();
}

function checkSelectedProductsAvailability(cartMapMilkBrandIdQuantity) {
	var queryParams = "";
	cartMapMilkBrandIdQuantity.forEach((quantity, milkBrandId) => {
		queryParams += milkBrandId + "=" + quantity + "&";
	});
	if (queryParams.endsWith('&')) {
	    queryParams = queryParams.slice(0, -1);
	}
	alert(queryParams);	// 21=2&22=1
}
