const quotes = [
    {
        quote: "산다는 것 그것은 치열한 전투이다.",
    },
    {
        quote: "피할 수 없으면 즐겨라.",
    },
    {
        quote: "꿈을 계속 간직하고 있으면, 반드시 실현할 때가 온다.",
    },
    {
        quote: "잠은 보약이다.",
    },
    {
        quote: "지나간 일에 미련을 갖지 말자.",
    }

];

const quote = document.querySelector("#quote span:first-child");

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
