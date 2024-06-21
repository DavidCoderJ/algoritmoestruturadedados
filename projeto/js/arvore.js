        // Definição da árvore binária usando JavaScript puro
        class TreeNode {
            constructor(value) {
                this.value = value;
                this.left = null;
                this.right = null;
            }
        }

        class BinaryTree {
            constructor() {
                this.root = null;
            }

            insert(value) {
                const newNode = new TreeNode(value);
                if (this.root === null) {
                    this.root = newNode;
                } else {
                    this._insertRecursive(this.root, newNode);
                }
            }

            _insertRecursive(rootNode, newNode) {
                if (newNode.value < rootNode.value) {
                    if (rootNode.left === null) {
                        rootNode.left = newNode;
                    } else {
                        this._insertRecursive(rootNode.left, newNode);
                    }
                } else if (newNode.value > rootNode.value) {
                    if (rootNode.right === null) {
                        rootNode.right = newNode;
                    } else {
                        this._insertRecursive(rootNode.right, newNode);
                    }
                } else {
                    // newNode.value === rootNode.value, valor duplicado
                    console.log(`Valor ${newNode.value} já existe na árvore. Ignorando inserção.`);
                    // Poderia lançar um alerta ou lidar com a mensagem de erro de outra forma
                }
            }

            remove(value) {
                this.root = this._removeRecursive(this.root, value);
            }

            _removeRecursive(rootNode, value) {
                if (rootNode === null) {
                    return null;
                }
                if (value < rootNode.value) {
                    rootNode.left = this._removeRecursive(rootNode.left, value);
                } else if (value > rootNode.value) {
                    rootNode.right = this._removeRecursive(rootNode.right, value);
                } else {
                    // Node to delete found

                    // Case 1: No child or one child
                    if (rootNode.left === null) {
                        return rootNode.right;
                    } else if (rootNode.right === null) {
                        return rootNode.left;
                    }

                    // Case 2: Two children
                    const minNode = this._findMinNode(rootNode.right);
                    rootNode.value = minNode.value;
                    rootNode.right = this._removeRecursive(rootNode.right, minNode.value);
                }
                return rootNode;
            }

            _findMinNode(node) {
                if (node.left === null) {
                    return node;
                } else {
                    return this._findMinNode(node.left);
                }
            }

            // Busca em largura (Breadth-First Search)
            breadthFirstSearch() {
                if (!this.root) {
                    return [];
                }

                let result = [];
                let queue = [this.root];

                while (queue.length > 0) {
                    let node = queue.shift();
                    result.push(node.value);
                    if (node.left) {
                        queue.push(node.left);
                    }
                    if (node.right) {
                        queue.push(node.right);
                    }
                }

                return result;
            }

            // Pré-ordem (Pre-order traversal)
            preOrder() {
                return this._preOrderRecursive(this.root, []);
            }

            _preOrderRecursive(node, result) {
                if (node) {
                    result.push(node.value);
                    this._preOrderRecursive(node.left, result);
                    this._preOrderRecursive(node.right, result);
                }
                return result;
            }

            // Em ordem (In-order traversal)
            inOrder() {
                return this._inOrderRecursive(this.root, []);
            }

            _inOrderRecursive(node, result) {
                if (node) {
                    this._inOrderRecursive(node.left, result);
                    result.push(node.value);
                    this._inOrderRecursive(node.right, result);
                }
                return result;
            }

            // Pós-ordem (Post-order traversal)
            postOrder() {
                return this._postOrderRecursive(this.root, []);
            }

            _postOrderRecursive(node, result) {
                if (node) {
                    this._postOrderRecursive(node.left, result);
                    this._postOrderRecursive(node.right, result);
                    result.push(node.value);
                }
                return result;
            }
        }

        // Definição das variáveis globais necessárias para p5.js
        let binaryTree;
        let canvasWidth = 800;
        let canvasHeight = 500;

        // Variáveis para controle de drag e zoom
        let offsetX = 0;
        let offsetY = 0;
        let scaleFactor = 1.0;
        let minScale = 0.5;
        let maxScale = 2.0;
        let dragging = false;
        let lastMouseX = 0;
        let lastMouseY = 0;

        function setup() {
            let canvas = createCanvas(canvasWidth, canvasHeight).parent('sketch-container');
            canvas.mouseWheel(handleMouseWheel);
            canvas.mousePressed(startDragging);
            canvas.mouseReleased(stopDragging);

            binaryTree = new BinaryTree();
            
        }

        function draw() {
            background(255);
            translate(offsetX, offsetY);
            scale(scaleFactor);
            textSize(20);
            textAlign(CENTER, CENTER);

            // Definir o espaçamento inicial com base na largura do canvas e o nível da árvore
            let initialHorizontalSpacing = canvasWidth / 1.6;
            
            drawTree(binaryTree.root, width / 2, 50, 0, initialHorizontalSpacing);
        }

        function drawTree(node, x, y, level, horizontalSpacing) {
            if (node !== null) {
                // Desenhar o nó
                fill(0);
                noStroke();
                circle(x, y, 40);
                fill(255);
                text(node.value, x, y);

                // Calcular o espaçamento horizontal para os filhos
                let nextLevel = level + 1;
                let nextHorizontalSpacing = horizontalSpacing / 2;

                // Desenhar as linhas para os filhos, se existirem
                if (node.left !== null) {
                    stroke(0);
                    line(x, y + 20, x - nextHorizontalSpacing, y + 100);
                    drawTree(node.left, x - nextHorizontalSpacing, y + 100, nextLevel, nextHorizontalSpacing);
                }
                if (node.right !== null) {
                    stroke(0);
                    line(x, y + 20, x + nextHorizontalSpacing, y + 100);
                    drawTree(node.right, x + nextHorizontalSpacing, y + 100, nextLevel, nextHorizontalSpacing);
                }
            }
        }

        function handleMouseWheel(event) {
            let delta = event.deltaY * -0.01;
            let zoom = scaleFactor + delta;
            scaleFactor = constrain(zoom, minScale, maxScale);
            return false;
        }

        function startDragging() {
            if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
                dragging = true;
                lastMouseX = mouseX;
                lastMouseY = mouseY;
            }
        }

        function stopDragging() {
            dragging = false;
        }

        function mouseDragged() {
            if (dragging) {
                let dx = mouseX - lastMouseX;
                let dy = mouseY - lastMouseY;
                offsetX += dx / scaleFactor;
                offsetY += dy / scaleFactor;
                lastMouseX = mouseX;
                lastMouseY = mouseY;
            }
        }

        function insertNode() {
            const insertValueInput = document.getElementById("insertValue");
            const value = parseInt(insertValueInput.value);
            if (!isNaN(value)) {
                binaryTree.insert(value);
                insertValueInput.value = "";
            } else {
                alert("Por favor, insira um valor válido.");
            }
        }

        function removeNode() {
            const removeValueInput = document.getElementById("removeValue");
            const value = parseInt(removeValueInput.value);
            if (!isNaN(value)) {
                binaryTree.remove(value);
                removeValueInput.value = "";
            } else {
                alert("Por favor, insira um valor válido.");
            }
        }

        function breadthFirstSearch() {
            const result = binaryTree.breadthFirstSearch();
            displayResult(result);
        }

        function preOrder() {
            const result = binaryTree.preOrder();
            displayResult(result);
        }

        function inOrder() {
            const result = binaryTree.inOrder();
            displayResult(result);
        }

        function postOrder() {
            const result = binaryTree.postOrder();
            displayResult(result);
        }

        function displayResult(result) {
            const output = document.getElementById("output");
            output.value = result.join(', ');
        }