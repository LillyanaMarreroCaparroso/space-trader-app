import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const Loans = ({ userData }) => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      const response = await fetch(
        `https://api.spacetraders.io/my/loans?token=${userData.token}`
      );
      const data = await response.json();
      setLoans(data.loans);
    };
    fetchLoans();
  }, [userData]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loans</Text>
      {!loans || loans.length === 0 ? (
        <Text>No loans available</Text>
      ) : (
        loans.map((loan) => (
          <View key={loan.id} style={styles.loan}>
            <Text style={styles.loanType}>{loan.type}</Text>
            <Text style={styles.loanAmount}>
              Repayment Amount: {loan.repaymentAmount}
            </Text>
            <Text style={styles.loanDue}>Due: {loan.due}</Text>
            <Text style={styles.loanStatus}>Status: {loan.status}</Text>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  loan: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: "80%",
  },
  loanType: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  loanAmount: {
    fontSize: 16,
    marginBottom: 5,
  },
  loanDue: {
    fontSize: 16,
    marginBottom: 5,
  },
  loanStatus: {
    fontSize: 16,
  },
});

export default Loans;
