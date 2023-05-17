class MatchGameMaker extends HTMLElement {
    constructor() {
        super();


        const shadow = this.attachShadow({ mode: 'open' });
        const vocabId = this.getAttribute('data-vocabId');
        console.log(vocabId);
        const thisElement = this;
        
        let text = "";
        


        let wordbank = "";
        let shuffledPairs = [];
        let tiles = [];
        let shuffledTiles = [];
        let firstTile = null;
        let displayContainer = false;

        // shuffledPairs = shuffleArray(wordbank);

        // tiles = createTiles(shuffledPairs);

        // shuffledTiles = shuffleTiles(tiles);

        function getVocabList(){
            let data = "";
            if (!vocabId) {
                data = thisElement.textContent.trim().split('\n').map(line => line.trim()).join('\n');
            }
            else{
                const vocabList = document.getElementById(vocabId);
                data = vocabList.textContent.trim().split('\n').map(line => line.trim()).join('\n');
            }
            return data;
        }

        function getWordBank(rawtext) {
            const splitText = rawtext.split('\n')
                .map(str => {
                    let [term, translation] = str.split(/ :| - /);
                    if (!translation) { translation = term;}
                    return { term, translation }
                }).filter(pair => pair.term !== "");
                console.log("splittext:", splitText);
            return splitText;
        }

        function shuffleArray(array) {
            const newArray = [...array];
            for (let i = newArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
            }
            // console.log("shuffledArray", newArray);
            return newArray;
        }

        function createTiles(shuffledPairs) {
            // console.log("how many pairs", shuffledPairs);
            const tilesArray = [];
            let counter = 0;
            for (let pair of shuffledPairs) {
                if (counter >= 6) {
                    break;
                }
                let tile1 = document.createElement('div');
                tile1.classList.add("tile", "gametile");
                tile1.setAttribute('data-term', pair.term);
                tile1.setAttribute('data-translation', pair.translation);
                tile1.setAttribute('translate', 'no');
                tile1.id = counter;
                tile1.addEventListener('click', handleTileClick);
                tile1.textContent = pair.term;

                tilesArray.push(tile1);

                let tile2 = document.createElement('div');
                tile2.classList.add("tile", "gametile");
                tile2.setAttribute('data-term', pair.term);
                // tile2.setAttribute('data-translation', pair.translation);
                tile2.setAttribute('translate', 'no');
                tile2.id = (counter + 100);
                tile2.addEventListener('click', handleTileClick);
                tile2.textContent = pair.translation;

                tilesArray.push(tile2);

                counter++;
            }
            // console.log("tiles create", tilesArray);
            return tilesArray;
        }

        function shuffleTiles(array) {
            const newArray = [...array];
            for (let i = newArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
            }
            return newArray;
        }

        function handleTileClick(event) {
            let clickedTile = event.target.closest(".gametile");


            if (!clickedTile) {
                return;
            }
            clickedTile.classList.add("clicked");
            if (firstTile && firstTile.id === clickedTile.id) {
                firstTile.classList.remove("clicked");
                clickedTile.classList.remove("clicked");
                firstTile = null;
                clickedTile = null;
            }
            if (firstTile && clickedTile) {
                if (firstTile.dataset.term === clickedTile.dataset.term) {
                    firstTile.textContent = "\uD83D\uDE00";
                    clickedTile.textContent = "\uD83D\uDE00";
                    firstTile.classList.add("matched");
                    clickedTile.classList.add("matched");
                    // console.log("match found");
                } else {
                    firstTile.classList.remove("clicked");
                    clickedTile.classList.remove("clicked");

                }
                firstTile = null;
                clickedTile = null;
            } else {
                firstTile = clickedTile;

            }
        }

        function playAgain(event) {
            event.preventDefault();
            tiles = null;
            firstTile = null;
            shuffledPairs = null;
            shuffledTiles = null;
            shadowDiv.innerHTML = "";
            

            text = getVocabList();
            wordbank = getWordBank(text);
            shuffledPairs = shuffleArray(wordbank);
            displayContainer = true;
            shadowDiv.style.display = displayContainer ? 'grid' : 'none';
            tiles = createTiles(shuffledPairs);
            shuffledTiles = shuffleTiles(tiles);
            shuffledTiles.forEach(div => {
                shadowDiv.appendChild(div);
            });
            // console.log("tiles", shuffledTiles);
        }

        shadow.innerHTML = `

        <style>
        .matchgamecontainer {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            grid-auto-rows: minxmax(100px, auto);
            gap: 10px;
        }

        @media (min-width: 800px) {
            .matchgamecontainer {
              grid-template-columns: repeat(4, minmax(160px, 1fr));
            }
          }
        
        .tile {
            min-height: 80px;
            padding: 5px;
            background-color: lightblue;
            border-radius: 5px;
            cursor: pointer;
            align-content: center;
            justify-content: center;
            font-weight: bold;
            font-size: medium;
            transition: background-color 0.3s;
            word-break: break-word;
            display: flex;
            flex-wrap: wrap;
        
        }

        .not-displayed {
           display: none; 
        }
        
        .clicked {
            background-color: rgb(133, 115, 214);
        }
        
        .matched {
            background-color: #10a37f;
        }
        
        .tile:hover {
            background-color: gray;
        }
        
        .matchgamecontainer input[type="button"] {
            padding: 12px 0;
            color: #fff;
            background-color: #10a37f;
            border: none;
            border-radius: 4px;
            margin: 10px;
            text-align: center;
            cursor: pointer;
            width: 120px;
          }
        
        h3 {
            text-align: center;
        }

        .button {
            appearance: none;
            background-color: #2ea44f;
            border: 1px solid rgba(27, 31, 35, .15);
            border-radius: 6px;
            box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
            box-sizing: border-box;
            color: #fff;
            font-size: 14px;
            font-weight: 600;
            line-height: 20px;
            padding: 6px 16px;
            position: relative;
            text-align: center;
            text-decoration: none;
            user-select: none;
            -webkit-user-select: none;
            touch-action: manipulation;
            vertical-align: middle;
            white-space: nowrap;
          }
          
          .button:focus:not(:focus-visible):not(.focus-visible) {
            box-shadow: none;
            outline: none;
          }
          
          .button:hover {
            background-color: #2c974b;
          }
          
          .button:focus {
            box-shadow: rgba(46, 164, 79, .4) 0 0 0 3px;
            outline: none;
          }
          
          .button:disabled {
            background-color: #94d3a2;
            border-color: rgba(27, 31, 35, .1);
            color: rgba(255, 255, 255, .8);
            cursor: default;
          }
          
          .button:active {
            background-color: #298e46;
            box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
          }    

          .nav-buttons {
            display: flex;
            margin-top: 10px;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
        
        </style>
        <div id="game" class="matchgamecontainer"></div>

        <div class="nav-buttons"><button id="btn-play-again" class="button" type="button">Load Tiles</button>
         `;

        const button = shadow.querySelector("#btn-play-again");
        button.addEventListener('click', buttonClick);
        function buttonClick(event) {
        button.textContent = "Play Again";
            playAgain(event);

        };

        const shadowDiv = shadow.querySelector("#game");
        // console.log("shadowDiv", shadowDiv);
        shadowDiv.style.display = displayContainer ? 'grid' : 'none';
        shuffledTiles.forEach(div => {
            shadowDiv.appendChild(div);

        });

    }
}
customElements.define('match-game-maker', MatchGameMaker);