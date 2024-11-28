# [Website](https://v3.znsconnect.io) - V3

# ZNS Connect Name Service

ZNS Connect is a decentralized multichain naming system built on the blockchain. Our mission is to simplify the Web3 experience by offering user-friendly and memorable domain names.

ZNS Connect APP simplifies Web3 interactions by replacing complex addresses with user-friendly names, providing a seamless experience for users. Built on Zetachain, Polygon, and other EVM-compatible chains, ZNS Connect empowers users with enhanced digital identities and enables smooth transactions across various blockchains.

## What We're Building:

We're on a mission to redefine how you experience the Web3 world. We're creating a decentralized naming service that spans Omnichain, designed for Web3, Identifiers, and DAOs. Our goal is to empower users with enhanced digital identities and facilitate smooth transactions across various blockchains

### Key Highlights:

- Launched on the Polygon Mainnet and Zetachain testnet

- 45,000+ Domain Minting

- 3th place out of 5,300 projects at the DoraHacks hackathon

- 8th place in the NFT category on Magic Store

- Officially verified on NFTScan Explorer

- ZNS Connect integrate OKX Web3 wallet

- 40K Followers Milestone Reached

- We are an integral part of the Zetachain Ecosystem

As part of the Zetachain Ecosystem, ZNS Connect is proud to be a key player in the blockchain revolution, contributing to the mass adoption of Web3 technologies.

**1.1** - Overview: The overview section provides a high-level understanding of the ZNS Connect Name Service (ZNS). It describes ZNS as a decentralized naming system built on the Zetachain blockchain that aims to simplify the identification and interaction of participants within the web3 ecosystem. It emphasizes the importance of user-friendly and memorable names in place of complex addresses for improved user experience and widespread adoption.

**1.2** - Objectives: The objectives section outlines the specific goals and objectives of the ZNS Connect Name Service. It highlights the primary intentions of ZNS, which may include enhancing user accessibility and convenience, enabling seamless cross-chain interactions, establishing decentralized web identities, improving branding and reputation management, and facilitating the verification of NFTs and artistic works. These objectives serve as the guiding principles behind the development and implementation of ZNS.

**1.3** - Benefits: The benefits section focuses on the advantages and positive outcomes that ZNS brings to the blockchain ecosystem. It elaborates on the potential benefits for users, developers, and the wider community. These benefits may include simplified addressing and user experience, increased trust and authenticity, improved discoverability and interactions, enhanced security and privacy, efficient management of digital assets, and seamless integration with social platforms. By highlighting these benefits, the section showcases the value proposition of ZNS.

## Whitepaper

Please go the to following link for the Whitepaper

[ZNS Connect Whitepaper](https://docs.znsconnect.io/whitepaper)

## Legal

https://docs.znsconnect.io/legal

## Documentation

[Please visit the documentation Gitbook By clicking here!](https://docs.znsconnect.io/introduction)

## Flow

<div align="center">
  <img src="./public/img/readme/flow.png">
</div>

## Run Locally

Clone the project

```bash
  git clone https://github.com/ZNS-Connect/zns-v2-main
```

Go to the project directory

```bash
  cd zns-v2-main
```

Install dependencies

```bash
  npm/yarn/pnpm install
```

Start the dev server

```bash
  npm/yarn/pnpm run dev
```

## Rest API Reference

#### Base URL: https://v3.znsconnect.io/api

#### Resolve Domain

```
  GET /resolveDomain?tld=<CHAIN_TLD>&domain=<YOUR_DOMAIN>
```

| Parameter | Type     | Description                                       |
| :-------- | :------- | :------------------------------------------------ |
| `tld`     | `string` | **Required**. tld of the domain                   |
| `chain`   | `string` | **Required**. Base part of domain without the tld |

#### Request URL Example:

```
  GET v3.znsconnect.io/api/resolveDomain?tld=honey&domain=tonystark
```

#### Response

```json
{
  "code": 200,
  "address": "0x9DaA27Ba25B1fa267Fe46D9C9F8b3676A5bc7D1c"
}
```

#### Resolve Address

```
  GET /resolveAddress?tld=<CHAIN_TLD>&address=<YOUR_ADDRESS>
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `tld`     | `string` | **Required**. tld of the domain   |
| `address` | `string` | **Required**. Address to look for |

#### Request URL Example:

```
  GET v3.znsconnect.io/api/resolveAddress?tld=honey&address=0x9DaA27Ba25B1fa267Fe46D9C9F8b3676A5bc7D1c
```

#### Response

```json
{
  "code": 200,
  "primaryDomain": "tonystark",
  "userOwnedDomains": ["tonystark", "nickfury", "thorodinsson"]
}
```

## Deployment

To deploy this project run

```bash
  npm/yarn/pnpm run build
  npm/yarn/pnpm run start
```

# Figma Design

- [Figma Official](https://www.figma.com/file/GEbIDuBIxyiylUPMOeBGyS/ZETA-ZNS?type=design&node-id=160-358&mode=design&t=p0KrToHknvsWkf7y-0)

<!-- - [Figma Hardik](https://www.figma.com/file/N94rRpj0bvGCfRs56wZ4Z2/ZNS_hardik?type=design&node-id=0%3A1&mode=design&t=O5JMDd47uVKKOaVG-1) -->

## Support

For support, please join the official ZNS Discord server using the following link

https://discord.gg/9JBPv5uDtN
