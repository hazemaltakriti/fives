var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var App;
(function (App) {
    var Cell = (function () {
        function Cell(x, y) {
            this.x = x;
            this.y = y;
            this.connectedWith = new Array();
        }
        Cell.prototype.drawComputer = function () {
            for (var _i = 0, _a = App.Config.ComputerPlayer.moves; _i < _a.length; _i++) {
                var move = _a[_i];
                beginShape();
                stroke(255);
                noFill();
                strokeWeight(2);
                vertex(move.from.getX() * App.Config.offsetX, move.from.getY() * App.Config.offsetY);
                vertex(move.to.getX() * App.Config.offsetX, move.to.getY() * App.Config.offsetY);
                endShape();
            }
            noStroke();
            if (this == App.Config.currentCell)
                fill(0);
            else {
                if (this.connectedWith.length > 0) {
                    fill(255, 0, 255);
                }
                else
                    fill(255, 255, 255);
            }
        };
        Cell.prototype.drawHuman = function () {
            for (var _i = 0, _a = App.Config.humanPlayer.moves; _i < _a.length; _i++) {
                var move = _a[_i];
                beginShape();
                stroke(120);
                strokeWeight(2);
                vertex(move.from.getX() * App.Config.offsetX, move.from.getY() * App.Config.offsetY);
                vertex(move.to.getX() * App.Config.offsetX, move.to.getY() * App.Config.offsetY);
                endShape();
            }
            noStroke();
            if (this == App.Config.currentCell)
                fill(0);
            else {
                if (this.connectedWith.length > 0) {
                    fill(255, 0, 255);
                }
                else
                    fill(255, 255, 255);
            }
        };
        Cell.prototype.draw = function () {
            this.drawComputer();
            this.drawHuman();
            ellipse(this.x * App.Config.offsetX, this.y * App.Config.offsetY, App.Config.radius, App.Config.radius);
            App.Game.drawSquares();
        };
        Cell.prototype.isBelong = function (x, y) {
            return x < App.Config.numRow && y < App.Config.numRow && x >= 0 && y >= 0;
        };
        Cell.prototype.rightConnect = function () {
            if (this.isBelong(this.y, this.x + 1)) {
                var rightCell = this.getRight();
                if (!this.isConnectedWithRight()) {
                    this.connectedWith.push(rightCell);
                    rightCell.connectedWith.push(this);
                }
            }
        };
        Cell.prototype.BottomConnect = function () {
            if (this.isBelong(this.y + 1, this.x)) {
                var bottomCell = this.getBottom();
                if (!this.isConnectedWithBottom()) {
                    this.connectedWith.push(bottomCell);
                    bottomCell.connectedWith.push(this);
                }
            }
        };
        Cell.prototype.LeftConnect = function () {
            if (this.isBelong(this.y, this.x - 1)) {
                var leftCell = this.getLeft();
                if (!this.isConnectedWithLeft()) {
                    this.connectedWith.push(leftCell);
                    leftCell.connectedWith.push(this);
                }
            }
        };
        Cell.prototype.TopConnect = function () {
            if (this.isBelong(this.y - 1, this.x)) {
                var ToppCell = this.getTop();
                if (!this.isConnectedWithTop()) {
                    this.connectedWith.push(ToppCell);
                    ToppCell.connectedWith.push(this);
                }
            }
        };
        Cell.prototype.getTop = function () {
            return App.Config.grid[this.y - 1][this.x];
            ;
        };
        Cell.prototype.getRight = function () {
            if (!this.isBelong(this.y, this.x + 1))
                return undefined;
            return App.Config.grid[this.y][this.x + 1];
        };
        Cell.prototype.getBottom = function () {
            return App.Config.grid[this.y + 1][this.x];
            ;
        };
        Cell.prototype.getLeft = function () {
            return App.Config.grid[this.y][this.x - 1];
            ;
        };
        Cell.prototype.isFallConnected = function () {
            if (this.hasRight() && this.hasBottom())
                return this.isConnectedWithBottom() && this.isConnectedWithRight();
            if (this.hasRight() && !this.hasBottom())
                return this.isConnectedWithRight();
            if (this.hasBottom() && !this.hasRight())
                return this.isConnectedWithBottom();
            if (!this.hasBottom() && !this.hasRight())
                return true;
            return false;
        };
        Cell.prototype.isConnectedWithTop = function () {
            return this.connectedWith.indexOf(this.getTop()) != -1;
        };
        Cell.prototype.isConnectedWithRight = function () {
            return this.connectedWith.indexOf(this.getRight()) != -1;
        };
        Cell.prototype.isConnectedWithBottom = function () {
            return this.connectedWith.indexOf(this.getBottom()) != -1;
        };
        Cell.prototype.isConnectedWithLeft = function () {
            return this.connectedWith.indexOf(this.getLeft()) != -1;
        };
        Cell.prototype.removeBottomConnect = function () {
            if (!this.hasBottom())
                return;
            var bottomCell = this.getBottom();
            var index = this.connectedWith.indexOf(bottomCell);
            if (index == -1)
                return;
            this.connectedWith.splice(index, 1);
            bottomCell.connectedWith.splice(bottomCell.connectedWith.indexOf(this), 1);
        };
        Cell.prototype.hasRight = function () {
            return typeof App.Config.grid[this.y][this.x + 1] != typeof undefined;
        };
        Cell.prototype.hasBottom = function () {
            return this.isBelong(this.y + 1, this.x);
        };
        Cell.prototype.hasTop = function () {
            return this.isBelong(this.y - 1, this.x);
        };
        Cell.prototype.hasLeft = function () {
            return this.isBelong(this.y, this.x - 1);
        };
        Cell.prototype.removeRightConnect = function () {
            if (!this.hasRight())
                return;
            var rightCell = this.getRight();
            var index = this.connectedWith.indexOf(rightCell);
            if (index == -1)
                return;
            this.connectedWith.splice(index, 1);
            rightCell.connectedWith.splice(rightCell.connectedWith.indexOf(this), 1);
        };
        Cell.prototype.getY = function () {
            return this.y;
        };
        Cell.prototype.getX = function () {
            return this.x;
        };
        Cell.prototype.getNeighours = function () {
            var arr = [];
            if (this.hasRight())
                arr.push(this.getRight());
            if (this.hasBottom())
                arr.push(this.getBottom());
            if (this.hasLeft())
                arr.push(this.getLeft());
            if (this.hasTop())
                arr.push(this.getTop());
            if (this.hasBottom())
                if (this.getBottom().hasRight())
                    arr.push(this.getBottom().getRight());
            if (this.hasBottom())
                if (this.getBottom().hasLeft())
                    arr.push(this.getBottom().getLeft());
            if (this.hasTop())
                if (this.getTop().hasRight())
                    arr.push(this.getTop().getRight());
            if (this.hasTop())
                if (this.getTop().hasLeft())
                    arr.push(this.getTop().getLeft());
            return arr;
        };
        Cell.prototype.canMoveToRight = function () {
            return this.hasRight() && !this.isConnectedWithRight();
        };
        Cell.prototype.canMoveToBottom = function () {
            return this.hasBottom() && !this.isConnectedWithBottom();
        };
        Cell.prototype.availableMoves = function () {
            var moves = new Array();
            if (this.canMoveToRight())
                moves.push(new App.Move(this, this.getRight()));
            if (this.canMoveToBottom())
                moves.push(new App.Move(this, this.getBottom()));
            return moves;
        };
        return Cell;
    }());
    App.Cell = Cell;
})(App || (App = {}));
var App;
(function (App) {
    var Player = (function () {
        function Player() {
            this.moves = new Array();
        }
        Player.prototype.SpecifyTypeEffectMove = function (move) {
            var point = 0;
            if (move.from.hasRight() && move.from.getRight() == move.to) {
                if (this.isSquare(move.from)) {
                    point++;
                }
                if (move.from.hasTop()) {
                    if (this.isSquare(move.from.getTop())) {
                        point++;
                    }
                }
            }
            if (move.from.hasBottom() && move.from.getBottom() == move.to) {
                if (this.isSquare(move.from)) {
                    point++;
                }
                if (move.from.hasLeft()) {
                    if (this.isSquare(move.from.getLeft())) {
                        point++;
                    }
                }
            }
            if (point == 0)
                move.setTypeEffect(App.TypeEffect.NORMAL);
            if (point == 1)
                move.setTypeEffect(App.TypeEffect.SINGLESCORE);
            if (point == 2)
                move.setTypeEffect(App.TypeEffect.DOUBLESCORE);
        };
        Player.prototype.applyMove = function (move) {
            this.moves.push(move);
            try {
                if (move.to == move.from.getRight()) {
                    if (move.from.isConnectedWithRight()) {
                        throw "every thing is bad ";
                    }
                    move.from.rightConnect();
                }
                else {
                    if (move.from.isConnectedWithBottom()) {
                        throw "every thing is bad ";
                    }
                    move.from.BottomConnect();
                }
                this.SpecifyTypeEffectMove(move);
            }
            catch (e) {
                console.log("you cant apply your move because it existed before ");
            }
        };
        Player.prototype.removeMove = function (move) {
            var index = this.moves.indexOf(move);
            if (index == -1)
                console.log("error");
            else {
                this.moves.splice(index, 1);
                if (move.to == move.from.getRight()) {
                    move.from.removeRightConnect();
                }
                else {
                    move.from.removeBottomConnect();
                }
            }
        };
        Player.prototype.isSquare = function (cell) {
            return cell.hasBottom() && cell.hasRight() &&
                cell.isConnectedWithRight() && cell.isConnectedWithBottom()
                && cell.getRight().isConnectedWithBottom() && cell.getBottom().isConnectedWithRight();
        };
        Player.prototype.isSquareBelongToMe = function (cell) {
            var firstMove = this.findMove(cell, cell.getRight());
            if (firstMove == null)
                firstMove = this.getOpponent().findMove(cell, cell.getRight());
            var secondtMove = this.findMove(cell, cell.getBottom());
            if (secondtMove == null)
                secondtMove = this.getOpponent().findMove(cell, cell.getBottom());
            var thirdtMove = this.findMove(cell.getRight(), cell.getRight().getBottom());
            if (thirdtMove == null)
                thirdtMove = this.getOpponent().findMove(cell.getRight(), cell.getRight().getBottom());
            var fourthtMove = this.findMove(cell.getBottom(), cell.getBottom().getRight());
            if (fourthtMove == null)
                fourthtMove = this.getOpponent().findMove(cell.getBottom(), cell.getBottom().getRight());
            var moves = [firstMove, secondtMove, thirdtMove, fourthtMove];
            var maxMove = moves[0];
            for (var i = 0; i < moves.length; i++) {
                if (maxMove.id < moves[i].id)
                    maxMove = moves[i];
            }
            return this.moves.indexOf(maxMove) >= 0;
            ;
        };
        Player.prototype.getOpponent = function () {
            return this;
        };
        Player.prototype.findMove = function (from, to) {
            for (var _i = 0, _a = this.moves; _i < _a.length; _i++) {
                var move = _a[_i];
                if (move.from == from && move.to == to) {
                    return move;
                }
            }
            return null;
        };
        Player.prototype.getScore = function () {
            var score = 0;
            for (var _i = 0, _a = this.moves; _i < _a.length; _i++) {
                var move = _a[_i];
                if (move.typeEffect == App.TypeEffect.SINGLESCORE)
                    score++;
                if (move.typeEffect == App.TypeEffect.DOUBLESCORE)
                    score += 2;
            }
            return score;
        };
        Player.prototype.isWinner = function () {
            if (App.Game.getWinner() == this)
                return true;
            return false;
        };
        return Player;
    }());
    App.Player = Player;
})(App || (App = {}));
var App;
(function (App) {
    var ComputerPlayer = (function (_super) {
        __extends(ComputerPlayer, _super);
        function ComputerPlayer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ComputerPlayer.prototype.playMove = function () {
            var strategy = new App.MiniMax();
            var bestMove = strategy.bestMove();
            this.applyMove(bestMove);
            return bestMove;
        };
        ComputerPlayer.prototype.getOpponent = function () {
            return App.Config.humanPlayer;
        };
        return ComputerPlayer;
    }(App.Player));
    App.ComputerPlayer = ComputerPlayer;
})(App || (App = {}));
var App;
(function (App) {
    var HumanPlayer = (function (_super) {
        __extends(HumanPlayer, _super);
        function HumanPlayer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HumanPlayer.prototype.playMoveByArrow = function (key) {
            var currentCell = App.Config.currentCell;
            var from = null;
            var to = null;
            if (key == 'ArrowRight') {
                if (currentCell.hasRight() && !currentCell.isConnectedWithRight()) {
                    from = currentCell;
                    to = currentCell.getRight();
                }
            }
            if (key == 'ArrowDown') {
                if (currentCell.hasBottom() && !currentCell.isConnectedWithBottom()) {
                    from = currentCell;
                    to = currentCell.getBottom();
                }
            }
            if (key == 'ArrowUp') {
                if (currentCell.hasTop() && !currentCell.isConnectedWithTop()) {
                    to = currentCell;
                    from = currentCell.getTop();
                }
            }
            if (key == 'ArrowLeft') {
                if (currentCell.hasLeft() && !currentCell.isConnectedWithLeft()) {
                    to = currentCell;
                    from = currentCell.getLeft();
                }
            }
            if (from != null && to != null) {
                var move = new App.Move(from, to);
                this.applyMove(move);
                if (App.Config.currentCell == to)
                    App.Config.currentCell = from;
                else
                    App.Config.currentCell = to;
                return move;
            }
            return null;
        };
        HumanPlayer.prototype.getOpponent = function () {
            return App.Config.ComputerPlayer;
        };
        return HumanPlayer;
    }(App.Player));
    App.HumanPlayer = HumanPlayer;
})(App || (App = {}));
var App;
(function (App) {
    var MiniMax = (function () {
        function MiniMax() {
        }
        MiniMax.prototype.evaluate = function (depth) {
            var computer = App.Config.ComputerPlayer;
            var human = App.Config.humanPlayer;
            if (human.isWinner())
                return -10 + computer.getScore();
            if (computer.isWinner())
                return +10 - human.getScore();
            return 0;
        };
        MiniMax.prototype.run = function (depth, isMaximize, aplha, beta) {
            if (aplha === void 0) { aplha = -Infinity; }
            if (beta === void 0) { beta = +Infinity; }
            var computer = App.Config.ComputerPlayer;
            var human = App.Config.humanPlayer;
            if (App.Game.isTerminate()) {
                return this.evaluate(depth);
            }
            if (depth > App.Config.maxDepth)
                return this.evaluate(depth);
            if (isMaximize) {
                var bestVal = -Infinity;
                for (var _i = 0, _a = App.Game.getCells(); _i < _a.length; _i++) {
                    var cell = _a[_i];
                    for (var _b = 0, _c = cell.availableMoves(); _b < _c.length; _b++) {
                        var move = _c[_b];
                        computer.applyMove(move);
                        if (move.typeEffect != App.TypeEffect.NORMAL)
                            bestVal = Math.max(bestVal, this.run(depth + 1, true));
                        else
                            bestVal = Math.max(bestVal, this.run(depth + 1, true));
                        computer.removeMove(move);
                        aplha = Math.max(aplha, bestVal + move.heuristic());
                        if (beta <= aplha)
                            return bestVal;
                    }
                }
                return bestVal;
            }
            else {
                var bestVal = +Infinity;
                for (var _d = 0, _e = App.Game.getCells(); _d < _e.length; _d++) {
                    var cell = _e[_d];
                    for (var _f = 0, _g = cell.availableMoves(); _f < _g.length; _f++) {
                        var move = _g[_f];
                        human.applyMove(move);
                        if (move.typeEffect != App.TypeEffect.NORMAL)
                            bestVal = Math.min(bestVal, this.run(depth + 1, false));
                        else
                            bestVal = Math.min(bestVal, this.run(depth + 1, false));
                        human.removeMove(move);
                        beta = Math.min(beta, bestVal + move.heuristic());
                        if (beta <= aplha)
                            return bestVal;
                    }
                }
                return bestVal;
            }
        };
        MiniMax.prototype.getBestMoveByHeuristic = function (player) {
            var grid = App.Config.grid;
            var winnerMove = null;
            for (var _i = 0, _a = App.Game.getCells(); _i < _a.length; _i++) {
                var cell = _a[_i];
                for (var _b = 0, _c = cell.availableMoves(); _b < _c.length; _b++) {
                    var move = _c[_b];
                    player.applyMove(move);
                    player.removeMove(move);
                    if (winnerMove == null)
                        winnerMove = move;
                    if (move.heuristic() > winnerMove.heuristic()) {
                        winnerMove = move;
                    }
                }
            }
            return winnerMove;
        };
        MiniMax.prototype.bestMove = function (player) {
            if (player === void 0) { player = App.Config.ComputerPlayer; }
            var winnerMove = null;
            var val = -Infinity;
            for (var _i = 0, _a = App.Game.getCells(); _i < _a.length; _i++) {
                var cell = _a[_i];
                for (var _b = 0, _c = cell.availableMoves(); _b < _c.length; _b++) {
                    var move = _c[_b];
                    player.applyMove(move);
                    var temp = this.run(0, true);
                    if (winnerMove == null)
                        winnerMove = move;
                    if (val < temp + move.heuristic()) {
                        val = temp;
                        winnerMove = move;
                    }
                    player.removeMove(move);
                }
            }
            return winnerMove;
        };
        return MiniMax;
    }());
    App.MiniMax = MiniMax;
})(App || (App = {}));
var App;
(function (App) {
    var Graph = (function () {
        function Graph() {
            this.cells = new Array();
            for (var i = 0; i < App.Config.numRow; i++) {
                this.cells[i] = new Array();
                for (var j = 0; j < App.Config.numCol; j++) {
                    this.cells[i][j] = new App.Cell(j, i);
                }
            }
        }
        Graph.prototype.get = function (x, y) {
            return this.cells[x][y];
        };
        return Graph;
    }());
    App.Graph = Graph;
})(App || (App = {}));
var App;
(function (App) {
    var Game = (function () {
        function Game(defaultStarter) {
            if (defaultStarter === void 0) { defaultStarter = App.Config.humanPlayer; }
            this.defaultStarter = defaultStarter;
        }
        Game.prototype.run = function () {
            var _this = this;
            var interval = setInterval(function () {
                document.getElementById("computerScore").innerHTML = "" + App.Config.ComputerPlayer.getScore();
                document.getElementById("humanScore").innerHTML = "" + App.Config.humanPlayer.getScore();
                console.log(_this.PlayerRole());
                if (Game.isTerminate())
                    clearInterval(interval);
                else {
                    if (_this.PlayerRole() == App.Config.ComputerPlayer) {
                        App.Config.ComputerPlayer.playMove();
                    }
                }
            }, 1000);
        };
        Game.prototype.displayBoard = function () {
            document.getElementById("computer");
        };
        Game.isTerminate = function () {
            var grid = App.Config.grid;
            for (var i = 0; i < App.Config.numRow; i++) {
                for (var j = 0; j < App.Config.numCol; j++) {
                    var cell = grid[i][j];
                    if (cell.availableMoves().length > 0)
                        return false;
                }
            }
            return true;
        };
        Game.getCells = function () {
            var cells = new Array();
            for (var i = 0; i < App.Config.numRow; i++) {
                for (var j = 0; j < App.Config.numCol; j++) {
                    cells.push(App.Config.grid[i][j]);
                }
            }
            return cells;
        };
        Game.prototype.PlayerRole = function () {
            var humanPlayer = App.Config.humanPlayer;
            var computerPlayer = App.Config.ComputerPlayer;
            var lastHumanMove = humanPlayer.moves.slice(-1)[0];
            var lastComputerMove = computerPlayer.moves.slice(-1)[0];
            if (humanPlayer.moves.length == 0 && computerPlayer.moves.length == 0)
                return this.defaultStarter;
            if (humanPlayer.moves.length == 0 && computerPlayer.moves.length != 0) {
                if (lastComputerMove.typeEffect == App.TypeEffect.NORMAL)
                    return humanPlayer;
                return computerPlayer;
            }
            if (humanPlayer.moves.length != 0 && computerPlayer.moves.length == 0) {
                if (lastHumanMove.typeEffect == App.TypeEffect.NORMAL)
                    return computerPlayer;
                return humanPlayer;
            }
            if (lastHumanMove.id > lastComputerMove.id) {
                if (lastHumanMove.typeEffect == App.TypeEffect.NORMAL)
                    return computerPlayer;
                return humanPlayer;
            }
            if (lastComputerMove.typeEffect == App.TypeEffect.NORMAL)
                return humanPlayer;
            return computerPlayer;
        };
        Game.drawSquares = function () {
            for (var _i = 0, _a = Game.getCells(); _i < _a.length; _i++) {
                var cell = _a[_i];
                if (!App.Config.ComputerPlayer.isSquare(cell))
                    continue;
                if (App.Config.ComputerPlayer.isSquareBelongToMe(cell))
                    fill(100);
                else
                    fill(255);
                beginShape();
                vertex(cell.getX() * App.Config.offsetX, cell.getY() * App.Config.offsetY);
                vertex(cell.getBottom().getX() * App.Config.offsetX, cell.getBottom().getY() * App.Config.offsetY);
                vertex(cell.getBottom().getX() * App.Config.offsetX, cell.getBottom().getY() * App.Config.offsetY);
                vertex(cell.getBottom().getRight().getX() * App.Config.offsetX, cell.getBottom().getRight().getY() * App.Config.offsetY);
                endShape();
            }
        };
        Game.getWinner = function () {
            if (Game.isTerminate()) {
                if (App.Config.ComputerPlayer.getScore() > App.Config.humanPlayer.getScore())
                    return App.Config.ComputerPlayer;
                return App.Config.humanPlayer;
            }
            return null;
        };
        Game.drawLastLine = function () {
            var maxMove = null;
            for (var _i = 0, _a = App.Config.ComputerPlayer.moves.concat(App.Config.humanPlayer.moves); _i < _a.length; _i++) {
                var move = _a[_i];
                if (maxMove == null)
                    maxMove = move;
                else if (maxMove.id < move.id)
                    maxMove = move;
            }
            if (maxMove != null) {
                beginShape();
                stroke(color(255, 0, 255));
                noFill();
                strokeWeight(4);
                vertex(maxMove.from.getX() * App.Config.offsetX, maxMove.from.getY() * App.Config.offsetY);
                vertex(maxMove.to.getX() * App.Config.offsetX, maxMove.to.getY() * App.Config.offsetY);
                endShape();
            }
        };
        return Game;
    }());
    App.Game = Game;
})(App || (App = {}));
var App;
(function (App) {
    var Main = (function () {
        function Main() {
        }
        Main.setUp = function () {
            for (var i = 0; i < App.Config.numRow; i++) {
                App.Config.grid[i] = new Array();
                for (var j = 0; j < App.Config.numCol; j++) {
                    App.Config.grid[i][j] = new App.Cell(j, i);
                }
            }
            var game = new App.Game();
            Main.game = game;
            game.run();
        };
        Main.test = function () {
            var cell = App.Config.grid[0][0];
            App.Config.ComputerPlayer.applyMove(new App.Move(cell, cell.getRight()));
            App.Config.ComputerPlayer.applyMove(new App.Move(cell.getBottom(), cell.getBottom().getRight()));
            App.Config.ComputerPlayer.applyMove(new App.Move(cell, cell.getBottom()));
            App.Config.ComputerPlayer.applyMove(new App.Move(cell.getRight(), cell.getRight().getRight()));
            App.Config.ComputerPlayer.applyMove(new App.Move(cell.getBottom().getRight(), cell.getBottom().getRight().getRight()));
            cell = App.Config.grid[1][0];
        };
        return Main;
    }());
    App.Main = Main;
})(App || (App = {}));
var App;
(function (App) {
    var TypeEffect;
    (function (TypeEffect) {
        TypeEffect[TypeEffect["SINGLESCORE"] = 0] = "SINGLESCORE";
        TypeEffect[TypeEffect["DOUBLESCORE"] = 1] = "DOUBLESCORE";
        TypeEffect[TypeEffect["NORMAL"] = 2] = "NORMAL";
    })(TypeEffect = App.TypeEffect || (App.TypeEffect = {}));
    var Move = (function () {
        function Move(form, to) {
            this.from = form;
            this.to = to;
            this._id = Move.counter;
            Move.counter++;
        }
        Move.prototype.setTypeEffect = function (typeEffect) {
            this.typeEffect = typeEffect;
        };
        Move.prototype.isRightJoin = function () { return this.from.hasRight() && this.to == this.from.getRight(); };
        Move.prototype.isBottomJoin = function () { return this.from.hasBottom() && this.to == this.from.getBottom(); };
        Move.prototype.getOriginStartSquare = function (cell) {
            var originCellSquare = cell;
            if (this.isRightJoin()) {
                if (cell.hasTop())
                    originCellSquare = cell.getTop();
            }
            if (this.isBottomJoin()) {
                if (cell.hasLeft())
                    originCellSquare = cell.getLeft();
            }
            return originCellSquare;
        };
        Move.prototype.numLineInThisState = function (cell) {
            var lines = 0;
            if (cell.isConnectedWithRight())
                lines++;
            if (cell.isConnectedWithBottom())
                lines++;
            if (cell.getBottom().isConnectedWithRight())
                lines++;
            if (cell.getRight().isConnectedWithBottom())
                lines++;
            return lines;
        };
        Move.prototype.heuristic = function () {
            var point = 0;
            if (this.typeEffect == TypeEffect.SINGLESCORE)
                return +1;
            if (this.typeEffect == TypeEffect.DOUBLESCORE)
                return +2;
            if (App.Config.level == "hard") {
                if (this.numLineInThisState(this.getOriginStartSquare(this.from)) == 3)
                    return -Infinity;
                if (this.isRightJoin() && this.from.hasTop()) {
                    if (this.numLineInThisState(this.getOriginStartSquare(this.from.getTop())) == 3)
                        return -Infinity;
                    if (this.numLineInThisState(this.getOriginStartSquare(this.from)) == 3)
                        return -Infinity;
                }
                if (this.isBottomJoin() && this.from.hasLeft()) {
                    if (this.numLineInThisState(this.getOriginStartSquare(this.from.getLeft())) == 3)
                        return -Infinity;
                    if (this.numLineInThisState(this.getOriginStartSquare(this.from)) == 3)
                        return -Infinity;
                }
            }
            return point;
        };
        Object.defineProperty(Move.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Move.counter = 0;
        return Move;
    }());
    App.Move = Move;
})(App || (App = {}));
var App;
(function (App) {
    var currentCell;
    currentCell = null;
    App.Config = {
        grid: new Array(),
        numRow: 5,
        numCol: 5,
        radius: 10,
        offsetX: 30,
        offsetY: 30,
        currentCell: currentCell,
        ComputerPlayer: new App.ComputerPlayer(),
        humanPlayer: new App.HumanPlayer(),
        maxDepth: 2,
        level: "easy"
    };
})(App || (App = {}));
//# sourceMappingURL=app.js.map