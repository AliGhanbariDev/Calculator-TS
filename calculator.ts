type InvestmentData = {
  initialAmount: number;
  annualContribution: number;
  expectedReturn: number;
  duration: number;
};

type InvestmentResult = {
  year: string;
  totalAmount: number;
  totalContributions: number;
  totalInterestEarned: number;
};

type calculationResult = InvestmentResult[] | string;

function calculateinvestment(data: InvestmentData): calculationResult {
  const { initialAmount, annualContribution, expectedReturn, duration } = data;

  if (initialAmount < 0) {
    return `Initial amount must be at least zero, the current one is: ${initialAmount}`;
  }

  if (initialAmount <= 0) {
    return 'No valid amount of years provided';
  }

  if (expectedReturn < 0) {
    return `Expected return must be at least zero, the current one is: ${expectedReturn}`;
  }

  let total = initialAmount;
  let totalContributions = 0;
  let totalInterestEarned = 0;

  const annualResults: InvestmentResult[] = [];

  for (let i = 0; i < duration; i++) {
    total = total * (1 + expectedReturn);
    totalInterestEarned = total - totalContributions - initialAmount;
    totalContributions = totalContributions + annualContribution;
    total = total + annualContribution;

    annualResults.push({
      year: `Year ${i + 1}`,
      totalAmount: total,
      totalInterestEarned: totalInterestEarned,
      totalContributions,
    });
  }

  return annualResults;
}

function printResults(results: calculationResult) {
  if (typeof results === 'string') {
    console.log(results);
    return;
  }

  for (const yearEndResult of results) {
    console.log(yearEndResult.year);
    console.log(`Total: ${yearEndResult.totalAmount.toFixed(0)}`);
    console.log(
      `Total Contributions: ${yearEndResult.totalContributions.toFixed(0)}`
    );
    console.log(
      `Total Interest Earned: ${yearEndResult.totalInterestEarned.toFixed(0)}`
    );
    console.log('------------------');
  }
}

const investmentData: InvestmentData = {
  initialAmount: 5000,
  annualContribution: 500,
  expectedReturn: 0.08,
  duration: 10,
};

const results = calculateinvestment(investmentData);

printResults(results);
