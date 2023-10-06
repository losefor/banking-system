
![bank](./docs/assets/bank.jpg)

# Nest.js Banking System

Welcome to the Nest.js Banking System project! This repository contains the source code for a modern and secure banking system developed using the Nest.js framework.

## Table of Contents

- [Nest.js Banking System](#nestjs-banking-system)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Erd](#erd)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Ensuring the security of the API](#ensuring-the-security-of-the-api)
    - [Standards and regulations](#standards-and-regulations)

## Features


- **User Management**: Create, update, and manage user accounts with authentication and authorization mechanisms in place.

- **Account Management**: Enable users to create various types of accounts, such as savings, checking, and more.

- **Transaction Handling**: Facilitate secure and efficient transactions, including deposits, withdrawals, transfers, and transaction history tracking.

- **Security**: Implement robust security measures to protect user data and financial information. This includes encryption, access controls, and best practices for security.

- **Notifications**: Send notifications to users for various account activities, such as balance updates, transaction confirmations, and security alerts.

- **Reports and Analytics**: Generate reports and analytics for account holders to monitor their financial activities and make informed decisions.

## Erd
![bank](./src/prisma/generated-erd.svg)


## Getting Started

Follow these steps to set up and run the Nest.js Banking System project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your system.
- A database system (e.g., PostgreSQL, MySQL, or SQLite) installed and configured.

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/losefor/banking-system.git

###  Ensuring the security of the API
- **Token-based Security:** If using tokens for authentication, make sure they are securely generated, transmitted, and stored. Implement token expiration and refresh mechanisms to mitigate the risk of token misuse.
- **Data Encryption:** Encrypt sensitive data at rest using strong encryption algorithms. This includes encrypting data stored in databases and any other storage systems.
- **Rate Limiting:** Enforce rate limiting to prevent abuse, brute force attacks, or denial-of-service (DoS) attacks. This helps ensure that the API is not overwhelmed by a large number of requests from a single user or IP address.
- **API Versioning:** Implement versioning in your API to ensure backward compatibility while allowing for updates and improvements. This helps prevent disruptions in service during updates.

### Standards and regulations 
https://github.com/gtonic/awesome-banking-tech