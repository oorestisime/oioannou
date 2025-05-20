"""
Cyprus 2025 – Self-Employed vs Ltd take-home calculator
Author: Orestis Ioannou
Last updated: 20 May 2025

Usage examples
--------------
# default demo revenues
uv run cyprus_tax_calc_2025.py

# custom revenues
uv run cyprus_tax_calc_2025.py 30000 75000 120000
"""

import sys

# ─────────────────────────────
#  CONSTANTS (current law 2025)
# ─────────────────────────────
INCOME_TAX_BANDS = [               # (upper-limit, rate)
    (19_500, 0.00),
    (28_000, 0.20),
    (36_300, 0.25),
    (60_000, 0.30),
    (float("inf"), 0.35),
]

SELF_EMP_SI_RATE  = 0.166   # 16.6 %
SELF_EMP_GHS_RATE = 0.040   # 4 %

EMPLOYEE_SI_RATE  = 0.088   # 8.8 %
EMPLOYER_SI_RATE  = 0.088   # 8.8 %
EMPLOYEE_GHS_RATE = 0.0265  # 2.65 %
EMPLOYER_GHS_RATE = 0.029   # 2.90 %
DIVIDEND_GHS_RATE = 0.0265  # 2.65 %

CORP_TAX_RATE     = 0.125   # 12.5 %
DIVIDEND_SDC_RATE = 0.17    # 17 %

AUDIT_COST        = 1_200
BOOKKEEPING_COST  =   800
REGISTRAR_LEVY    =   350

DEFAULT_SALARY    = 19_500  # salary kept in 0 % income-tax band


# ─────────────────────────────
#  Helper functions
# ─────────────────────────────
def personal_income_tax(income):
    """Cyprus personal-income tax (2025 bands)."""
    tax, lower = 0.0, 0.0
    for upper, rate in INCOME_TAX_BANDS:
        if income <= upper:
            tax += (income - lower) * rate
            break
        tax += (upper - lower) * rate
        lower = upper
    return tax


def calc_self_employed(gross):
    pit = personal_income_tax(gross)
    si  = gross * SELF_EMP_SI_RATE
    ghs = gross * SELF_EMP_GHS_RATE
    net = gross - pit - si - ghs
    eff = (gross - net) / gross * 100
    return dict(structure="Self-employed", gross=gross, net=net, eff=eff)


def calc_ltd(gross, salary=DEFAULT_SALARY):
    # Payroll levies
    emp_si  = salary * EMPLOYEE_SI_RATE
    emp_ghs = salary * EMPLOYEE_GHS_RATE
    er_si   = salary * EMPLOYER_SI_RATE
    er_ghs  = salary * EMPLOYER_GHS_RATE

    # Profit & tax
    profit  = gross - salary - er_si - er_ghs - AUDIT_COST - BOOKKEEPING_COST - REGISTRAR_LEVY
    corp    = max(profit * CORP_TAX_RATE, 0)
    pool    = max(profit - corp, 0)

    # Dividend levies
    div_sdc = pool * DIVIDEND_SDC_RATE
    div_ghs = pool * DIVIDEND_GHS_RATE

    net = (salary - emp_si - emp_ghs) + (pool - div_sdc - div_ghs)
    eff = (gross - net) / gross * 100
    return dict(structure="Ltd", gross=gross, net=net, eff=eff)


def print_row(d):
    print(f"{d['structure']:<15}{d['gross']:>10,.0f}{d['net']:>12,.0f}{d['eff']:>9.1f}%")


# ─────────────────────────────
#  Main routine
# ─────────────────────────────
def main(revenues):
    head = f"{'Type':<15}{'Gross':>10}{'Net':>12}{'Eff.Tax':>9}"
    line = "-" * len(head)
    print(head)
    print(line)
    for rev in revenues:
        for func in (calc_self_employed, calc_ltd):
            print_row(func(rev))
        print(line)


if __name__ == "__main__":
    if len(sys.argv) > 1:
        try:
            revs = [float(x) for x in sys.argv[1:]]
        except ValueError:
            sys.exit("Please pass only numbers as revenues.")
    else:
        revs = [30_000, 45_000, 60_000, 100_000, 150_000]  # demo defaults
    main(revs)
