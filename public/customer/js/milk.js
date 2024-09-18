function set_HATEOAS_links() {
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "http://localhost:9001/milk-brands/get_HATEOAS_links");
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

			var imageAddedCount = 1;

			var html_table = "<table>";
			for(var index=0; index < milkBrandBeans.length; index++){
				var milkBrandBean = milkBrandBeans[index];
				var milkBrandName = milkBrandBean.milkBrandName;
				var packaging = milkBrandBean.packaging;

				if(imageAddedCount == 1){
					html_table = html_table + "<tr>";
				}
				if(imageAddedCount == 4){
					html_table = html_table + "</tr>";
					imageAddedCount = 1;
				}
				++imageAddedCount;
				if(index == 0)
					getImageTagForMilkBrandType(milkBrandName, packaging)
				html_table = html_table + "<td style='padding-left: 50px; padding-top: 20px; padding-right: 50px; padding-bottom: 13px;'>" +
					getImageTagForMilkBrandType(milkBrandName, packaging) + "</td>";
				//html_table = html_table + "<td>" + milkBrandName + "---" + packaging + "</td>";
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

function getImageTagForMilkBrandType(milkBrandName, packaging) {
	var imagePath = "..\\images\\milk-brands\\" + milkBrandName + "\\" + packaging + ".JPG";
	return "<img src='" + imagePath + "' title='" + milkBrandName + " " + packaging + "' style='cursor: pointer; height: 200px;'>" +
			"<br>" +
			"<label style='cursor:pointer; color:blue;'>" + milkBrandName + " " + packaging + "</label>";
}