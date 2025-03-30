<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Calculators</title>
        <link rel="stylesheet" href="css/calculators_styles.css">
        <script src="js/calculators.js"></script>
    </head>

    <body onload="loadPage()">
        <div id="loading"></div>

        <?php include "header.php"; ?>

        <div class="calculators" style="display: none">
            <div class="calculator">
                <div class="title">
                    Monthly Bond Repayment
                </div>

                <form action="#" onsubmit="return false" class="calculatorForm">
                    <div class="column">
                        <div class="element">
                            <label class= "cal-label" for="purchaseprice">Purchase Price (R)</label><br>
                            <input type="number" step=".01" id="purchaseprice" name="purchaseprice" placeholder="1 000 000"><br>
                        </div>

                        <div class="element">
                            <label class= "cal-label" for="deposit">Deposit (R)</label><br>
                            <input type="number" step=".01" id="deposit" name="deposit" placeholder="0"><br>
                        </div>

                        <div class="element">
                            <label class= "cal-label" for="interest">Interest Rate (%)</label><br>
                            <input type="number" step=".001" id="interest" name="interest" placeholder="11.75"><br>
                        </div>

                        <div class="element">
                            <label class= "cal-label" for="term">Loan Term (Years)</label><br>
                            <input type="number" step=".01" id="term" name="term" placeholder="20"><br>
                        </div>
                    </div>

                    <div class="column">
                        <div class="element">
                            <label class= "cal-label" for="result1">Result (R)</label><br>
                            <input type="number" step=".01" id="result1" name="result" readonly><br>
                        </div>

                        <div class="element">
                            <input class="subbtn" type="submit" value="Calculate" onclick="bondRepayment()">
                        </div>
                    </div>
                </form>
            </div>

            <div class="calculator">
                <div class="title">
                    Bond Transfer Cost
                </div>

                <form action="#" onsubmit="return false" class="calculatorForm">
                    <div class="column">
                        <div class="element">
                            <label class= "cal-label" for="purchaseprice">Purchase Price (R)</label><br>
                            <input type="number" step=".01" id="purchase_price" name="purchaseprice" placeholder="1 000 000"><br>
                        </div>

                        <div class="element">
                            <label class= "cal-label" for="deposit">Loan Amount (R)</label><br>
                            <input type="number" step=".01" id="deposit_" name="deposit" placeholder="1 000 000"><br>
                        </div>
                    </div>

                    <div class="column">
                        <div class="element">
                            <label class= "cal-label" for="result2">Result (R)</label><br>
                            <input type="number" step=".01" id="result2" name="result" readonly><br>
                        </div>

                        <div class="element">
                            <input class="subbtn" type="submit" value="Calculate" onclick="bondTransferCost()">
                        </div>
                    </div>
                </form>
            </div>
        </div>
        
        <div class="empty" style="display: none">No calculators currently available</div>

        <div class="login-to-view" style="display: none">Login to view content</div>

        <?php include "footer.php"; ?>
    </body>
</html>