function add(n1, n2)
{
    let result;

    result = n1 + n2;
    return (result);
}

function subtract(n1, n2)
{
    let result;

    result = n1 - n2;
    return (result);
}

function multiply(n1, n2)
{
    let result;

    result = n1 * n2;
    return (result);
}

function divide(n1, n2)
{
    let result;

    result = n1 / n2;
    return (result);
}

function operate (n1, n2, operator)
{
    let result;

    if (operator === "+")
        result = add(n1, n2);
    else if (operator === "-")
        result = subtract(n1, n2);
    else if (operator === "*")
        result = multiply(n1, n2);
    else if (operator === "/")
        result = divide(n1, n2);
    return (result);
}