// set the dimensions and margins of the graph
var margin = {top: 10, right: 100, bottom: 30, left: 30},
    width = 1000 - margin.left - margin.right,
    height = 360 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("lines.csv", function(data) {

    // List of groups 
    var allGroup = ["3M Company","AES Corp","AFLAC Inc","AMETEK Inc","AT&T Inc","Abbott Laboratories","Accenture plc","Activision Blizzard","Acuity Brands Inc","Adobe Systems Inc","Advance Auto Parts","Aetna Inc","Affiliated Managers Group Inc","Agilent Technologies Inc","Air Products & Chemicals Inc","Akamai Technologies Inc","Alaska Air Group Inc","Albemarle Corp","Alexion Pharmaceuticals","Allergan Plc","Alliance Data Systems","Alliant Energy Corp","Allstate Corp","Alphabet Inc Class A","Alphabet Inc Class C","Altria Group Inc","Amazon.com Inc","Ameren Corp","American Airlines Group","American Electric Power","American Express Co","American International Group Inc.","American Tower Corp A","American Water Works Company Inc","Ameriprise Financial","AmerisourceBergen Corp","Amgen Inc","Amphenol Corp","Anadarko Petroleum Corp","Analog Devices Inc.","Anthem Inc.","Aon plc","Apache Corporation","Apartment Investment & Mgmt","Apple Inc.","Applied Materials Inc","Archer-Daniels-Midland Co","Arconic Inc","Arthur J. Gallagher & Co.","Assurant Inc","AutoZone Inc","Autodesk Inc","Automatic Data Processing","AvalonBay Communities Inc.","Avery Dennison Corp","BB&T Corporation","BIOGEN IDEC Inc.","Ball Corp","Bank of America Corp","Baxter International Inc.","Becton Dickinson","Best Buy Co. Inc.","BlackRock","Block H&R","Boeing Company","BorgWarner","Boston Properties","Boston Scientific","Bristol-Myers Squibb","Broadcom","C. H. Robinson Worldwide","CA Inc.","CBRE Group","CBS Corp.","CF Industries Holdings Inc","CIGNA Corp.","CME Group Inc.","CMS Energy","CSX Corp.","CVS Health","Cabot Oil & Gas","Campbell Soup","Capital One Financial","Cardinal Health Inc.","Carmax Inc","Carnival Corp.","Caterpillar Inc.","Celgene Corp.","Centene Corporation","CenterPoint Energy","CenturyLink Inc","Cerner","Charles Schwab Corporation","Charter Communications","Chesapeake Energy","Chevron Corp.","Chipotle Mexican Grill","Chubb Limited","Church & Dwight","Cimarex Energy","Cincinnati Financial","Cintas Corporation","Cisco Systems","Citigroup Inc.","Citrix Systems","Coca Cola Company","Cognizant Technology Solutions","Colgate-Palmolive","Comcast A Corp","Comerica Inc.","ConAgra Foods Inc.","Concho Resources","ConocoPhillips","Consolidated Edison","Constellation Brands","Corning Inc.","Costco Co.","Crown Castle International Corp.","Cummins Inc.","D. R. Horton","DTE Energy Co.","DaVita Inc.","Danaher Corp.","Darden Restaurants","Deere & Co.","Delta Air Lines","Dentsply Sirona","Devon Energy Corp.","Digital Realty Trust","Discover Financial Services","Discovery Communications-A","Discovery Communications-C","Dollar General","Dollar Tree","Dominion Resources","Dover Corp.","Dr Pepper Snapple Group","Duke Energy","E*Trade","EOG Resources","EQT Corporation","Eastman Chemical","Eaton Corporation","Ecolab Inc.","Edison Int'l","Edwards Lifesciences","Electronic Arts","Emerson Electric Company","Entergy Corp.","Equifax Inc.","Equinix","Equity Residential","Essex Property Trust Inc.","Estee Lauder Cos.","Eversource Energy","Exelon Corp.","Expedia Inc.","Expeditors Int'l","Express Scripts","Extra Space Storage","Exxon Mobil Corp.","F5 Networks","FLIR Systems","FMC Corporation","FMC Technologies Inc.","Fastenal Co","FedEx Corporation","Federal Realty Investment Trust","Fidelity National Information Services","Fifth Third Bancorp","FirstEnergy Corp","Fiserv Inc","Flowserve Corporation","Fluor Corp.","Foot Locker Inc","Ford Motor","Franklin Resources","Freeport-McMoran Cp & Gld","Gap (The)","Garmin Ltd.","General Dynamics","General Electric","General Growth Properties Inc.","General Mills","General Motors","Genuine Parts","Gilead Sciences","Global Payments Inc","Goldman Sachs Group","Goodyear Tire & Rubber","Grainger (W.W.) Inc.","HCP Inc.","HP Inc.","Halliburton Co.","Hanesbrands Inc","Harley-Davidson","Harris Corporation","Hartford Financial Svc.Gp.","Hasbro Inc.","Helmerich & Payne","Henry Schein","Hess Corporation","Hologic","Home Depot","Honeywell Int'l Inc.","Hormel Foods Corp.","Host Hotels & Resorts","Humana Inc.","Huntington Bancshares","IDEXX Laboratories","Illinois Tool Works","Illumina Inc","Ingersoll-Rand PLC","Intel Corp.","Intercontinental Exchange","International Business Machines","International Paper","Interpublic Group","Intl Flavors & Fragrances","Intuit Inc.","Intuitive Surgical Inc.","Invesco Ltd.","Iron Mountain Incorporated","J. B. Hunt Transport Services","JM Smucker","JPMorgan Chase & Co.","Jacobs Engineering Group","Johnson & Johnson","Johnson Controls International","Juniper Networks","KLA-Tencor Corp.","Kansas City Southern","Kellogg Co.","KeyCorp","Kimberly-Clark","Kimco Realty","Kohl's Corp.","Kroger Co.","L Brands Inc.","L-3 Communications Holdings","LKQ Corporation","Laboratory Corp. of America Holding","Lam Research","Leggett & Platt","Lennar Corp.","Leucadia National Corp.","Lilly (Eli) & Co.","Lincoln National","Lockheed Martin Corp.","Loews Corp.","Lowe's Cos.","LyondellBasell","M&T Bank Corp.","Macerich","Macy's Inc.","Marathon Oil Corp.","Marriott Int'l.","Marsh & McLennan","Martin Marietta Materials","Masco Corp.","Mastercard Inc.","Mattel Inc.","McCormick & Co.","McDonald's Corp.","McKesson Corp.","Medtronic plc","Merck & Co.","MetLife Inc.","Mettler Toledo","Microchip Technology","Micron Technology","Microsoft Corp.","Mid-America Apartments","Mohawk Industries","Molson Coors Brewing Company","Mondelez International","Monsanto Co.","Monster Beverage","Moody's Corp","Motorola Solutions Inc.","Mylan N.V.","NASDAQ OMX Group","NRG Energy","National Oilwell Varco Inc.","NetApp","Netflix Inc.","Newell Brands","Newfield Exploration Co","Newmont Mining Corp. (Hldg. Co.)","NextEra Energy","NiSource Inc.","Nike","Noble Energy Inc","Nordstrom","Norfolk Southern Corp.","Northern Trust Corp.","Northrop Grumman Corp.","Nucor Corp.","Nvidia Corporation","O'Reilly Automotive","ONEOK","Occidental Petroleum","Omnicom Group","Oracle Corp.","PACCAR Inc.","PG&E Corp.","PNC Financial Services","PPG Industries","PPL Corp.","PVH Corp.","Parker-Hannifin","Patterson Companies","Paychex Inc.","Pentair Ltd.","People's United Financial","PepsiCo Inc.","PerkinElmer","Perrigo","Pfizer Inc.","Philip Morris International","Pinnacle West Capital","Pioneer Natural Resources","Polo Ralph Lauren Corp.","Praxair Inc.","Priceline.com Inc","Principal Financial Group","Procter & Gamble","Progressive Corp.","Prologis","Prudential Financial","Public Serv. Enterprise Inc.","Public Storage","Pulte Homes Inc.","QUALCOMM Inc.","Quanta Services Inc.","Quest Diagnostics","Range Resources Corp.","Raytheon Co.","Realty Income Corporation","Red Hat Inc.","Regeneron","Regions Financial Corp.","Republic Services Inc","Robert Half International","Rockwell Automation Inc.","Rockwell Collins","Roper Industries","Ross Stores","Royal Caribbean Cruises Ltd","S&P Global Inc.","SCANA Corp","SL Green Realty","Salesforce.com","Scripps Networks Interactive Inc.","Seagate Technology","Sealed Air","Sempra Energy","Sherwin-Williams","Signet Jewelers","Simon Property Group Inc","Skyworks Solutions","Snap-On Inc.","Southern Co.","Southwest Airlines","Stanley Black & Decker","Starbucks Corp.","State Street Corp.","Stericycle Inc","Stryker Corp.","SunTrust Banks","Symantec Corp.","Sysco Corp.","T. Rowe Price Group","TE Connectivity Ltd.","TJX Companies Inc.","Target Corp.","Texas Instruments","Textron Inc.","The Bank of New York Mellon Corp.","The Clorox Company","The Cooper Companies","The Hershey Company","The Mosaic Company","The Travelers Companies Inc.","The Walt Disney Company","Thermo Fisher Scientific","Tiffany & Co.","Time Warner Inc.","Torchmark Corp.","Total System Services","Tractor Supply Company","Twenty-First Century Fox Class A","Twenty-First Century Fox Class B","Tyson Foods","U.S. Bancorp","UDR Inc","Ulta Salon Cosmetics & Fragrance Inc","Under Armour","Union Pacific","United Continental Holdings","United Health Group Inc.","United Parcel Service","United Rentals Inc.","United Technologies","Universal Health Services Inc.","Unum Group","V.F. Corp.","Valero Energy","Varian Medical Systems","Ventas Inc","Verisign Inc.","Verisk Analytics","Verizon Communications","Vertex Pharmaceuticals Inc","Viacom Inc.","Visa Inc.","Vornado Realty Trust","Vulcan Materials","Wal-Mart Stores","Walgreens Boots Alliance","Waste Management Inc.","Waters Corporation","Wec Energy Group Inc","Wells Fargo","Welltower Inc.","Western Digital","Western Union Co","Weyerhaeuser Corp.","Whirlpool Corp.","Williams Cos.","Wyndham Worldwide","Wynn Resorts Ltd","XL Capital","Xcel Energy Inc","Xerox Corp.","Xilinx Inc","Yum! Brands Inc","Zimmer Biomet Holdings","Zions Bancorp","eBay Inc."]

    // add the options to the button
    d3.select("#selectButton")
      .selectAll('myOptions')
     	.data(allGroup)
      .enter()
    	.append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button

    // A color scale: one color for each group
    var myColor = d3.scaleOrdinal()
      .domain(allGroup)
      .range(d3.schemeDark2);

    // Add X axis
    var x = d3.scaleLinear();
    // Add Y axis
    var y = d3.scaleLinear();
        
    var xAxisCall = d3.axisBottom();
    var yAxisCall = d3.axisLeft();  
    
    
    x.domain([new Date(2010), new Date(2018)]).range([0, width]);
    y.domain([0, 1000]).range([height, 0]);
    xAxisCall.scale(x);
    yAxisCall.scale(y);
    
    svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxisCall);
        
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxisCall);
    
    var parseTime = d3.timeFormat("%Y");
    
    // Initialize line 
    var line = svg
      .append('g')
      .append("path")
        .datum(data)
        .attr("d", d3.line()
          .y(function(d) { return x(+d.time) })
          .x(function(d) { return y(+d.A) })
        )
        .attr("stroke", function(d){ return myColor("A") })
        .style("stroke-width", 8)
        .style("fill", "none")
    
    
    // A function that update the line
    function update(selectedGroup) {

      // Create new data with the selection?
      var dataFilter = data.map(function(d){return {time: d.time, value:d[selectedGroup]} })
        
        // Update the domain
        x.domain([2009, 2019]).range([0, width])
        y.domain([0, d3.max(dataFilter, function(d) { return d.value*1.1; })]).range([height, 0])
        xAxisCall.scale(x)
        yAxisCall.scale(y)

        svg.select(".x")
            .call(xAxisCall)
        
        svg.select(".y")
            .call(yAxisCall)
        
      // update line
    line
      .datum(dataFilter)
      .transition()
      .duration(1000)
      .attr("d", d3.line()
        .x(function(d) { return x(+d.time) })
        .y(function(d) { return y(+d.value) })
      )
      .attr("stroke", function(d){ return myColor(selectedGroup) })
        
    }

    // When the button is changed, run the updateChart function
    d3.select("#selectButton").on("change", function(d) {
        
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        
        // run the updateChart function with this selected option
        update(selectedOption)
        
    })
    
    // Load initial Chart
    update('3M Company')

})
