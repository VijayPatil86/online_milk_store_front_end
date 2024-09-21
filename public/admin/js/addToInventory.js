milkBrandNameToAddToInventory = localStorage.getItem("milkBrandNameToAddToInventory");
packagingToAddToInventory = localStorage.getItem("packagingToAddToInventory");
milkBrandAvailableToAddToInventory = localStorage.getItem("milkBrandAvailableToAddToInventory");
milkBrandIdToAddToInventory = localStorage.getItem("milkBrandIdToAddToInventory");

window.addEventListener('unload', function () {
    localStorage.removeItem("milkBrandNameToAddToInventory");
	localStorage.removeItem("packagingToAddToInventory");
	localStorage.removeItem("milkBrandAvailableToAddToInventory");
	localStorage.removeItem("milkBrandIdToAddToInventory");
});

function setFieldsValues() {
	document.getElementById("txtMilkBrandName").value = milkBrandNameToAddToInventory;
	document.getElementById("txtMilkPackaging").value = packagingToAddToInventory;
	if(milkBrandAvailableToAddToInventory === "Y"){
		document.getElementById("lblMilkBrandAvailableValue").innerText = "Y";
	} else {
		document.getElementById("lblMilkBrandAvailableValue").innerText = "N";
	}
}

function addToInventory() {
	var purchasePrice = document.getElementById("txtMilkBrandPurchasePrice").value;
	var purchaseQuantity = document.getElementById("txtMilkBrandPurchaseQuantity").value;
	var sellPrice = document.getElementById("txtMilkBrandSellPrice").value;
	var data = {
	    purchasePrice: purchasePrice,
	    purchaseQuantity: purchaseQuantity,
		milkBrandInventoryBean: {
			currentSellPrice: sellPrice
		}
	};
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "http://localhost:9001/milk-brand-item-purchase/"+milkBrandIdToAddToInventory);
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(JSON.stringify(data));
	xhttp.onload = function() {
		if(xhttp.status == 200){	// success
			alert("Inventory Updated");
		}
		if(xhttp.status == 204){	// 204 No Content - Milk Brand Id does not exists
			alert("Milk Brand with id " + milkBrandIdToAddToInventory + " does not exist.");
		}
	}
}

function closeWindow() {
	localStorage.removeItem("milkBrandNameToAddToInventory");
	localStorage.removeItem("packagingToAddToInventory");
	localStorage.removeItem("milkBrandAvailableToAddToInventory");
	localStorage.removeItem("milkBrandIdToAddToInventory");
	window.close();
}