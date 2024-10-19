document.addEventListener('DOMContentLoaded',()=>{
    const expenseForm = document.getElementById('expense-form');
    const expenseNameInput = document.getElementById('expense-name');
    const expenseAmountInput = document.getElementById('expense-amount');
    const expenseList = document.getElementById('expense-list');
    const totalAmount = document.getElementById('total-amount');
    // const addExpenseBtn = document.getElementById('add-expense-btn');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let total = calculateTotal();
    renderExpenes();
    updateTotal();

    expenseForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        const name = expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value.trim());

        if(name !== "" && !isNaN(amount) && amount>0){
            const newExpense = {
                id:Date.now(),
                name: name,
                amount:amount,
            }
            expenses.push(newExpense);
            saveExpensesToLocal();
            updateTotal();

            expenseNameInput.value = "";
            expenseAmountInput.value = "";
            renderExpenes();
        }

    })


    function calculateTotal(){
        return expenses.reduce((sum , expense)=> sum + expense.amount,0)
    }

    function saveExpensesToLocal(){
        localStorage.setItem('expenses',JSON.stringify(expenses));
    }
    function updateTotal(){
        total = calculateTotal();
        totalAmount.textContent = total.toFixed(2);
    }
    function renderExpenes(){
        expenseList.innerHTML = "";
        expenses.forEach(expense=>{
            const li = document.createElement('li');
            li.innerHTML = `
            ${expense.name} - $${expense.amount}
            <button data-id="${expense.id}">Delete</button>
            `;
            expenseList.appendChild(li);

        });
    }
    expenseList.addEventListener('click',(e)=>{
        if(e.target.tagName === 'BUTTON'){
            const deleteId = parseInt(e.target.getAttribute('data-id'));
            expenses = expenses.filter(expense => expense.id !== deleteId);

            saveExpensesToLocal();
            renderExpenes();
            updateTotal();
        }
    })

})
