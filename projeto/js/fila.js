        // Definição da Fila usando JavaScript puro
        class Queue {
            constructor() {
                this.items = [];
            }

            enqueue(element) {
                this.items.push(element);
            }

            dequeue() {
                if(this.isEmpty()) {
                    return "Fila está vazia";
                }
                return this.items.shift();
            }

            isEmpty() {
                return this.items.length === 0;
            }

            getItems() {
                return this.items;
            }
        }

        // Variáveis globais
        let queue;
        let dequeuedItems = [];
        let canvasWidth = 800;
        let canvasHeight = 200;

        function setup() {
            let canvas = createCanvas(canvasWidth, canvasHeight).parent('sketch-container');
            queue = new Queue();
        }

        function draw() {
            background(255);
            drawQueue();
        }

        function drawQueue() {
            const items = queue.getItems();
            textSize(20);
            textAlign(CENTER, CENTER);

            for (let i = 0; i < items.length; i++) {
                fill(0);
                noStroke();
                rect(50 + i * 100, height / 2 - 25, 90, 50);
                fill(255);
                text(items[i], 95 + i * 100, height / 2);
            }
        }

        function enqueue() {
            const enqueueValueInput = document.getElementById("enqueueValue");
            const value = enqueueValueInput.value.trim();
            if (value) {
                queue.enqueue(value);
                enqueueValueInput.value = "";
                updateInputOrder();
            } else {
                alert("Por favor, insira um valor válido.");
            }
        }

        function dequeue() {
            const value = queue.dequeue();
            if (value !== "Fila está vazia") {
                dequeuedItems.push(value);
                updateOutput();
            } else {
                alert(value);
            }
        }

        function updateOutput() {
            const output = document.getElementById("output");
            output.value = dequeuedItems.join(', ');
        }

        function updateInputOrder() {
            const inputOrder = document.getElementById("inputOrder");
            inputOrder.value = queue.getItems().join(', ');
        }