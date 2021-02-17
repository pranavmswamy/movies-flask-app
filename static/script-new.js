window.onload = function(){ 
    
    document.getElementById("tickerInp").value = "";
    document.getElementById('testform').onsubmit= function(e){
        e.preventDefault();
    }
};

function click_clear(){

    
    document.getElementById("tickerInp").value = "";
    document.getElementById("ResultSection").style.visibility = "collapse";
    document.getElementById("errorMessage").style.visibility = "collapse";

    /* hide tabs */
    document.getElementById("CompanyOutlook").style.display = "block";
    document.getElementById("StockSummary").style.display = "none";
    document.getElementById("Charts").style.display = "none";
    document.getElementById("LatestNews").style.display = "none";

    
    document.getElementById("tab1").className = "tablinks active";
    if (document.getElementById("tab2").classList.contains("active")) { document.getElementById("tab2").className = "tablinks"; }
    if (document.getElementById("tab3").classList.contains("active")) { document.getElementById("tab3").className = "tablinks"; }
    if (document.getElementById("tab4").classList.contains("active")) { document.getElementById("tab4").className = "tablinks"; }
    
}

function click_search(){

    var ticker = document.getElementById("tickerInp").value;
    //alert("Hey: " + ticker);

    var requestObj = new XMLHttpRequest();
    requestObj.onreadystatechange = function(){
        console.log("this.readyState:"+ this.readyState);
        console.log("this.status:"+ this.status);
        if( this.readyState == 4)
        {
            if (this.status == 200)
            {
                
                document.getElementById("ResultSection").style.visibility = "visible";
                document.getElementById("errorMessage").style.visibility = "collapse";

                document.getElementById("CompanyOutlook").style.display = "block";
                document.getElementById("StockSummary").style.display = "none";
                document.getElementById("Charts").style.display = "none";
                document.getElementById("LatestNews").style.display = "none";

                document.getElementById("tab1").className = "tablinks active";
                if (document.getElementById("tab2").classList.contains("active")) { document.getElementById("tab2").className = "tablinks"; }
                if (document.getElementById("tab3").classList.contains("active")) { document.getElementById("tab3").className = "tablinks"; }
                if (document.getElementById("tab4").classList.contains("active")) { document.getElementById("tab4").className = "tablinks"; }

                jsonData = requestObj.responseText;
                //alert("from back-end:" + jsonData);
                jsonObj = JSON.parse(jsonData);
                //alert("Response Received");

                /********************************************************** Tab 1  **********************************************************/
                //alert(jsonObj.result1);
                document.getElementById("1_name").innerText = jsonObj.result1.name;
                document.getElementById("1_ticker").innerText = jsonObj.result1.ticker;
                document.getElementById("1_exchangeCode").innerText = jsonObj.result1.exchangeCode;
                document.getElementById("1_startDate").innerText = jsonObj.result1.startDate;
                document.getElementById("1_description").innerText = jsonObj.result1.description;

                /********************************************************** Tab 2  **********************************************************/
                
                //alert(jsonObj.result2);
                document.getElementById("2_ticker").innerText = jsonObj.result2.ticker;
                document.getElementById("2_timestamp").innerText = jsonObj.result2.timestamp;
                document.getElementById("2_prevClose").innerText = jsonObj.result2.prevClose;
                document.getElementById("2_open").innerText = jsonObj.result2.open;
                document.getElementById("2_high").innerText = jsonObj.result2.high;
                document.getElementById("2_low").innerText = jsonObj.result2.low;
                document.getElementById("2_last").innerText = jsonObj.result2.last;
                document.getElementById("2_change").innerText = String(jsonObj.result2.change) + String(" ");
                document.getElementById("2_percent").innerText = String(jsonObj.result2.percent) + String("% ");
                document.getElementById("2_volume").innerText = jsonObj.result2.volume;

                /* Change - up/down arrow */
                if (jsonObj.result2.change < 0){
                    var arrow1 = document.createElement("img");
                    arrow1.setAttribute("src", "https://csci571.com/hw/hw6/images/RedArrowDown.jpg");
                    arrow1.style.visibility = "visible";
                    arrow1.style.height = "15px";
                    arrow1.style.width = "15px";
                    document.getElementById("2_change").appendChild(arrow1);
                }
                else if (jsonObj.result2.change > 0){
                    var arrow1 = document.createElement("img");
                        arrow1.setAttribute("src", "https://csci571.com/hw/hw6/images/GreenArrowUp.jpg");
                        arrow1.style.visibility = "visible";
                        arrow1.style.height = "15px";
                        arrow1.style.width = "15px";
                        document.getElementById("2_change").appendChild(arrow1);
                }

                if (jsonObj.result2.percent < 0){
                    var arrow2 = document.createElement("img");
                    arrow2.setAttribute("src", "https://csci571.com/hw/hw6/images/RedArrowDown.jpg");
                    arrow2.style.visibility = "visible";
                    arrow2.style.height = "15px";
                    arrow2.style.width = "15px";
                    document.getElementById("2_percent").appendChild(arrow2);
                }
                else if (jsonObj.result2.percent > 0){
                    var arrow2 = document.createElement("img");
                        arrow2.setAttribute("src", "https://csci571.com/hw/hw6/images/GreenArrowUp.jpg");
                        arrow2.style.visibility = "visible";
                        arrow2.style.height = "15px";
                        arrow2.style.width = "15px";
                        document.getElementById("2_percent").appendChild(arrow2);
                }

                /********************************************************** Tab 4  **********************************************************/
                
                //alert(jsonObj.result4);
                
                news_ids = ["news1", "news2", "news3", "news4", "news5"];
                title_ids = ["4_title_1", "4_title_2", "4_title_3", "4_title_4", "4_title_5"];
                url_ids = ["4_url_1", "4_url_2", "4_url_3", "4_url_4", "4_url_5"];
                urlToImage_ids = ["4_urlToImage_1", "4_urlToImage_2", "4_urlToImage_3", "4_urlToImage_4", "4_urlToImage_5"];
                publishedAt_ids = ["4_publishedAt_1", "4_publishedAt_2", "4_publishedAt_3", "4_publishedAt_4", "4_publishedAt_5"];

                for (var i = 0; i < jsonObj.result4.length; i++) {

                    document.getElementById(news_ids[i]).style.visibility = "visible";
                    document.getElementById(title_ids[i]).innerText  = jsonObj.result4[i].title;
                    document.getElementById(url_ids[i]).href  = jsonObj.result4[i].url;
                    document.getElementById(urlToImage_ids[i]).src  = jsonObj.result4[i].urlToImage;
                    document.getElementById(publishedAt_ids[i]).innerText  = jsonObj.result4[i].publishedAt;

                }

                /********************************************************** Tab 3  **********************************************************/
                

                Highcharts.getJSON('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/new-intraday.json', function (data) {

                    var ohlc = [], volume = [], dataLength = jsonObj.result3[1].length, i = 0;
                    for (i; i < dataLength; i += 1) {
                        var year = jsonObj.result3[1][i][0];
                        var month = jsonObj.result3[1][i][1];
                        var day = jsonObj.result3[1][i][2];
                        var new_date = Date.UTC(year, month - 1, day);
                        /*
                        if (i == 1 || i == 0){

                            console.log("i : "+ jsonObj.result3[1][i]);
                        }
                        */
                        ohlc.push([
                            new_date, // the date
                            jsonObj.result3[1][i][3] // price
                        ]);

                        volume.push([
                            new_date, // the date
                            jsonObj.result3[1][i][4] // volume
                        ]);
                    }
                    //console.log("ohlc::::"+ohlc[1]);
                    //console.log("volume::::"+volume[1]);

                    // create the chart
                    Highcharts.stockChart('container', {

                        title: {
                            text: String(jsonObj.result3[0])
                        },

                        subtitle: {
                            useHTML : true,
                            text: '<u><a href="https://api.tiingo.com/" target="_blank">Source: Tiingo</a></u>' 
                        },

                        yAxis: [{
                            lineWidth: 1,
                            height: '100%',
                            width:'100%',
                            min : 0,
                            opposite: false,
                            labels: {
                                align: 'right'
                            },
                            title: {
                                text: 'Stock Price'
                            }
                        },
                        {
                            lineWidth: 1,
                            height: '100%',
                            width:'100%',
                            min : 0,
                            opposite: true,
                            labels: {
                            align: 'left'
                            },
                            title: {
                                text: 'Volume'
                            }
                        }
                        ],

                        rangeSelector: {
                            buttons: [{
                                type: 'day',
                                count: 7,
                                text: '7d'
                            }, {
                                type: 'day',
                                count: 15,
                                text: '15d'
                            },{
                                type: 'month',
                                count: 1,
                                text: '1m'
                            }, {
                                type: 'month',
                                count: 3,
                                text: '3m'
                            },{
                                type: 'month',
                                count: 6,
                                text: '6m'
                            }],
                            selected: 4,
                            inputEnabled: false
                        },

                        series: [{
                            name: String(jsonObj.result2.ticker),
                            type: 'area',
                            data: ohlc,
                            gapSize: 5,
                            tooltip: {
                                valueDecimals: 2
                            },
                            fillColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, Highcharts.getOptions().colors[0]],
                                    [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                ]
                            },
                            threshold: null
                        },
                        {
                            type: 'column',
                            id: String(jsonObj.result2.ticker) + '-volume',
                            name: String(jsonObj.result2.ticker) + ' Volume',
                            data: volume,
                            yAxis: 1
                        }]
                    });
                });

            }
            else{
                
                /* ERROR */
                document.getElementById("CompanyOutlook").style.display = "block";
                document.getElementById("StockSummary").style.display = "none";
                document.getElementById("Charts").style.display = "none";
                document.getElementById("LatestNews").style.display = "none";

                
                document.getElementById("tab1").className = "tablinks active";
                if (document.getElementById("tab2").classList.contains("active")) { document.getElementById("tab2").className = "tablinks"; }
                if (document.getElementById("tab3").classList.contains("active")) { document.getElementById("tab3").className = "tablinks"; }
                if (document.getElementById("tab4").classList.contains("active")) { document.getElementById("tab4").className = "tablinks"; }

                document.getElementById("ResultSection").style.visibility = "collapse";
                document.getElementById("errorMessage").style.visibility = "visible";
                

            }
        }
	}

    if (String(ticker) != ""){
        var url = '/test' + '?' + 'tickerVal=' + String(ticker);
        requestObj.open('GET',url,true);
        requestObj.send();
    }
}





