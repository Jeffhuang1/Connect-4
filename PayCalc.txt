using System;
public class PayCalc
{
	public static void Main()
	{
		double hourlyPay = 0; 							// Wage
		double unionFee = 0;							// Union Fees
		double unionRate = 0;							// % of income union receives
		double hoursWorked1 = 0; 						// # of hours worked in week 1
		double hoursWorked2 = 0;						// # of hours worked in week 2
		double overPay = 0;							// Overtime pay multiplier
		double totalPay1 = 0;							// Gross pay for week 1
		double totalPay2 = 0;							// Gross pay for week 2
		double totalPay = 0;							// Total gross pay
		double federalTax = 0;							// Total federal taxes for the 2 weeks
		double provinceTax = 0;							// Total provincial taxes for the 2 weeks
		double employmentInsurance = 0;						// Total employment insurance premiums
		double canadianPP = 0;							// Total canadian pension plan contributions
		double deductions = 0;							// Total deductions from the paycheck (federal tax, provincial tax, CPP)
		double netPay = 0;							// Net pay to your bank account
		double fedTaxBasicAmt = 11038;						// Federal Income Tax Basic Claim Amount (max)
		double fedTaxT1Amt = 43953;						// Federal Income Tax Tier 1 (max)
		double fedTaxT2Amt = 87907;						// Federal Income Tax Tier 2 (max)
		double fedTaxT3Amt = 136270;						// Federal Income Tax Tier 3 (max)
		double fedTaxPerc1 = 0.15;						// Federal Income Tax Rate in Tier 1
		double fedTaxPerc2 = 0.22;						// Federal Income Tax Rate in Tier 2
		double fedTaxPerc3 = 0.26;						// Federal Income Tax Rate in Tier 3
		double fedTaxPerc4 = 0.29;						// Federal Income Tax Rate in Tier 4
		double provTaxBasicAmt = 9869;						// Provincial Income Tax Basic Claim Amount (max)
		double provTaxT1Amt = 37606;						// Provincial Income Tax Tier 1 (max)
		double provTaxT2Amt = 75213;						// Provincial Income Tax Tier 2 (max)
		double provTaxT3Amt = 86354;						// Provincial Income Tax Tier 3 (max)
		double provTaxT4Amt = 104858;						// Provincial Income Tax Tier 4 (max)
		double provTaxT5Amt = 150000;						// Provincial Income Tax Tier 5 (max)
		double provTaxPerc1 = 0.0506;						// Provincial Income Tax Rate in Tier 1
		double provTaxPerc2 = 0.077;						// Provincial Income Tax Rate in Tier 2
		double provTaxPerc3 = 0.105;						// Provincial Income Tax Rate in Tier 3
		double provTaxPerc4 = 0.1229;						// Provincial Income Tax Rate in Tier 4
		double provTaxPerc5 = 0.147;						// Provincial Income Tax Rate in Tier 5
		double provTaxPerc6 = 0.168;						// Provincial Income Tax Rate in Tier 6
		double maxEI = 913.68;							// annual maximum EI deductions
		double maxCPP = 2529.25;						// annual maximum CPP contributions
	 	
 		string totalPayS;							// Strings of above values
		string unionFeeS;
		string federalTaxS;
		string provinceTaxS;
		string employmentInsuranceS;
		string canadianPPS;
		string deductionsS;
		string netPayS;
		
		//
		//Instructions
		//
		
		Console.WriteLine("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
		Console.WriteLine("@                 PLEASE READ                   @");
		Console.WriteLine("@ This Application Assumes Biweekly Pay Cheques @");
		Console.WriteLine("@          Enter Numerical Values Only          @");
		Console.WriteLine("@   Symbols Such As %, #, $ Cannot Be Entered   @");
		Console.WriteLine("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
		Console.WriteLine();
		Console.WriteLine();
		
		//
		// User input on amount of money they make
		//
		
		Console.Write("How much money do you earn hourly? ");
		hourlyPay = double.Parse(Console.ReadLine());
		
		Console.Write("What % fee does your union charge? (Enter 0 for no union) ");
		unionRate = double.Parse(Console.ReadLine());
		
		Console.Write("How many hours did you work the first week?: ");
		hoursWorked1 = double.Parse(Console.ReadLine());
		
		Console.Write("How many hours did you work the second week?: ");
		hoursWorked2 = double.Parse(Console.ReadLine());
		
		Console.WriteLine("How much do you get paid for overtime?: ");
		Console.Write("Enter the multiplier (1 for no overtime pay): ");
		overPay = double.Parse(Console.ReadLine());
		
		//
		// Total Pay Calculations
		//
		
		if(hoursWorked1 <= 40)
		{
			totalPay1 = hourlyPay * hoursWorked1;
		}
		else 
			if(hoursWorked1 > 40)
			{
				totalPay1 = hourlyPay * overPay * hoursWorked1;
			}
		
		if(hoursWorked2 <=40)
		{
			totalPay2 = hourlyPay * hoursWorked2;
		}
		else
			if(hoursWorked2 > 40)
			{
				totalPay2 = hourlyPay * overPay * hoursWorked2;
			}
			
		totalPay = totalPay1 + totalPay2;
		
		//	
		// Calculates federal tax values
		//
		
		if(totalPay <= fedTaxBasicAmt)															// income below basic amount
			{
				federalTax = 0;
			}
			if(totalPay > fedTaxBasicAmt / 26 && totalPay <= fedTaxT1Amt / 26)									// income in tier 1
				{
					federalTax = (totalPay - fedTaxBasicAmt / 26) * fedTaxPerc1;
				}
			else 
				if(totalPay > fedTaxT1Amt / 26 && totalPay <= fedTaxT2Amt / 26)									// income in tier 2
				{	
					federalTax = (fedTaxT1Amt - fedTaxBasicAmt) / 26 * fedTaxPerc1 + 
					(totalPay - fedTaxT1Amt / 26) * fedTaxPerc2;
				}
				else
					if(totalPay > fedTaxT2Amt / 26 && totalPay <= fedTaxT3Amt / 26)								// income in tier 3
					{
					federalTax = (fedTaxT1Amt - fedTaxBasicAmt) / 26 * fedTaxPerc1 + 
					(fedTaxT2Amt / 26  - fedTaxT1Amt / 26 ) * fedTaxPerc2 + 
					(totalPay - fedTaxT2Amt / 26) * fedTaxPerc3;
					}
					else 	
						if(totalPay > fedTaxT3Amt / 26)											// income in tier 4
						{
							federalTax = (fedTaxT1Amt - fedTaxBasicAmt) / 26 * fedTaxPerc1 + 
							(fedTaxT2Amt / 26 - fedTaxT1Amt / 26) * fedTaxPerc2 + 
							(fedTaxT3Amt / 26 - fedTaxT2Amt / 26) * fedTaxPerc3 + 
							(totalPay - fedTaxT3Amt / 26) * fedTaxPerc4;
						}
		
		//
		// Calculates provincial tax values
		//
			
		if(totalPay <= provTaxBasicAmt / 26)														// income below basic amount
			{
			provinceTax = 0;
			}
		else
			if(totalPay > provTaxBasicAmt / 26 && totalPay <= provTaxT1Amt / 26)									// income in tier 1
				{
				provinceTax = (totalPay - provTaxBasicAmt / 26) * provTaxPerc1;
				}
			else 
				if(totalPay > provTaxT1Amt / 26 && totalPay <= provTaxT2Amt / 26)								// income in tier 2
					{
					provinceTax = (provTaxT1Amt - provTaxBasicAmt) / 26 * provTaxPerc1 + 
					(totalPay - provTaxT1Amt / 26) * provTaxPerc2;
					}
				else
					if(totalPay > provTaxT2Amt / 26 && totalPay <= provTaxT3Amt / 26)							// income in tier 3
						{
						provinceTax = (provTaxT1Amt - provTaxBasicAmt) / 26 * provTaxPerc1 + 
						(provTaxT2Amt / 26 - provTaxT1Amt / 26) * provTaxPerc2 + 
						(totalPay - provTaxT2Amt / 26) * provTaxPerc3;
						}
					else
						if(totalPay > provTaxT3Amt / 26 && totalPay <= provTaxT4Amt / 26)						// income in tier 4
							{
							provinceTax = (provTaxT1Amt - provTaxBasicAmt) / 26 * provTaxPerc1 + 
							(provTaxT2Amt / 26 - provTaxT1Amt / 26) * provTaxPerc2 + 
							(provTaxT3Amt / 26 - provTaxT2Amt / 26) * provTaxPerc3 + 
							(totalPay - provTaxT3Amt / 26) * provTaxPerc4;
							}
						else
							if(totalPay > provTaxT4Amt / 26 && totalPay <= provTaxT5Amt / 26)					// income in tier 5
								{
								provinceTax = (provTaxT1Amt - provTaxBasicAmt) / 26 * provTaxPerc1 + 
								(provTaxT2Amt / 26 - provTaxT1Amt / 26) * provTaxPerc2 + 
								(provTaxT3Amt / 26 - provTaxT2Amt / 26) * provTaxPerc3 + 
								(provTaxT4Amt / 26 - provTaxT3Amt / 26) * provTaxPerc4 + 
								(totalPay - provTaxT4Amt / 26) * provTaxPerc5;
								}
							else 
								if(totalPay > provTaxT5Amt / 26)								// income in tier 6
									{
									provinceTax = (provTaxT1Amt - provTaxBasicAmt) / 26 * provTaxPerc1 + 
									(provTaxT2Amt / 26 - provTaxT1Amt / 26) * provTaxPerc2 + 
									(provTaxT3Amt / 26 - provTaxT2Amt / 26) * provTaxPerc3 + 
									(provTaxT4Amt / 26 - provTaxT3Amt / 26) * provTaxPerc4 + 
									(provTaxT5Amt / 26 - provTaxT4Amt / 26) * provTaxPerc5 + 
									(totalPay - provTaxT5Amt / 26) * provTaxPerc6;
									}
		
		//
		// Calculates employment insurance premiums
		//
		
		employmentInsurance = totalPay * 0.0188;
		
		if(employmentInsurance >= maxEI / 26)
			{
			employmentInsurance = maxEI / 26;
			}
			else
				{
				employmentInsurance = totalPay * 0.0188;
				}
		//
		// Calculates canadian pension plan contributions
		//
		
		if(canadianPP >= maxCPP / 26)
			{
			canadianPP = maxCPP / 26;
			}
			else
				{
				canadianPP = totalPay * 0.0495;
				}
		
		
		//
		// Calculates union/deductions/net pay
		//
		
		unionFee = totalPay * unionRate / 100;
		
		deductions = unionFee + federalTax + provinceTax + employmentInsurance + canadianPP;
		
		netPay = totalPay - deductions;
		
		totalPayS = totalPay.ToString("C");
		unionFeeS = unionFee.ToString("C");
		federalTaxS = federalTax.ToString("C");
		provinceTaxS = provinceTax.ToString("C");
		employmentInsuranceS = employmentInsurance.ToString("C");
		canadianPPS = canadianPP.ToString("C");
		deductionsS = deductions.ToString("C");
		netPayS = netPay.ToString("C");
		
		//
		//Displays Results
		//
		
		Console.WriteLine("The total amount of money you earned these two weeks is {0}." , totalPayS);
		Console.WriteLine("Your union fees are {0}", unionFeeS);
		Console.WriteLine("Your federal tax deductions are {0}.",federalTaxS);
		Console.WriteLine("Your provincial tax deductions are {0}.", provinceTaxS);
		Console.WriteLine("Your employment insurance deductions are {0}.", employmentInsuranceS);
		Console.WriteLine("Your Canadian pension plan contributions are {0}.", canadianPPS);
		Console.WriteLine("Your total deductions are {0}.",deductionsS);
		Console.WriteLine("Your net pay is {0}.",netPayS);
		
		Console.Write("Press enter to exit...");
		Console.ReadLine();
	}	
}