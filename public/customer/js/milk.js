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
			var dairyProductsContainerData = JSON.parse(this.responseText);
			var dairyProductBeans = dairyProductsContainerData.dairyProductBeans;

			document.getElementById("div_Content").innerHTML = "";
			document.getElementById("lblDairyProductsNotAvailable").style.display = "none";

			var imageAddedCount = 1;

			var html_table = "<table>";
			for(var index=0; index < dairyProductBeans.length; index++){
				var dairyProductBean = dairyProductBeans[index];
				var dairyProductName = dairyProductBean.dairyProductName;

				if(imageAddedCount == 1){
					html_table = html_table + "<tr>";
				}
				if(imageAddedCount == 4){
					html_table = html_table + "</tr>";
					imageAddedCount = 1;
				}
				++imageAddedCount;
				html_table = html_table + "<td>" + getImageTagForDairyProductType(dairyProductName) + "</td>";
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

function getImageTagForDairyProductType(dairyProductName) {
	switch(dairyProductName) {
		case "Butter":  {
			return "<a href='..\\html\\butter.html'>" +
				"<img src='..\\images\\Butter.jpg\' title='Butter' style='cursor: pointer;'>" +
				"<br>" +
				"<label style='padding-left: 110px; cursor:pointer; color:blue;'>Butter</label>" +
				"</a>";
		}
		case "Milk":  {
			return "<a href='..\\html\\milk.html'>" +
				"<img src='..\\images\\Milk.jpg\' title='Milk' style='cursor: pointer;'>" +
				"<br>" +
				"<label style='padding-left: 30px; cursor:pointer; color:blue;'>Milk</label>" +
				"</a>";
		}
		case "Buttermilk":  {
			return "<a href='..\\html\\Buttermilk.html'>" +
				"<img src='..\\images\\Buttermilk.jpg\' title='Buttermilk' style='cursor: pointer;'>" +
				"<br>" +
				"<label style='padding-left: 52px; cursor:pointer; color:blue;'>Buttermilk</label>" +
				"</a>";
		}
		case "Cheese":  {
			return "<a href='..\\html\\cheese.html'>" +
				"<img src='..\\images\\Cheese.jpg\' title='Cheese' style='cursor: pointer;'>" +
				"<br>" +
				"<label style='padding-left: 75px; cursor:pointer; color:blue;'>Cheese</label>" +
				"</a>";
		}
		case "Ghee":  {
			return "<a href='..\\html\\ghee.html'>" +
				"<img src='..\\images\\Ghee.jpg\' title='Ghee' style='cursor: pointer;'>" +
				"<br>" +
				"<label style='padding-left: 100px; cursor:pointer; color:blue;'>Ghee</label>" +
				"</a>";
		}
		case "Curd":  {
			return "<a href='..\\html\\curd.html'>" +
				"<img src='..\\images\\Curd.jpg\' title='Curd' style='cursor: pointer;'>" +
				"<br>" +
				"<label style='padding-left: 77px; cursor:pointer; color:blue;'>Curd</label>" +
				"</a>";
		}
	}
}