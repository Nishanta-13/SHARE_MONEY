const express = require('express');


const Plan = require('../models/planModel');
const Subs = require('../models/nameModel');

const fs = require('fs');
const { error } = require('console');
const jsonData = JSON.parse(fs.readFileSync('./maindata.json', 'utf-8'));

module.exports.finder = async (req, res) => {
    try {

        const { websiteName } = req.body;
        const websiteData = jsonData.websites.find(site => site.name === websiteName);

        if (!websiteData) {
            return res.status(404).send(`${websiteName} data not found`);
        }

        let website = await Subs.findOne({ name: websiteName })

        if (!website) {
            let subscription = await Subs.create(
                {
                    name: websiteName,
                    subscriptionPlans: []
                }
            )
        }

        website = await Subs.findOne({ name: websiteName })

        for (const plan of websiteData.plans) {

            let description = [];

            if(plan.resolution){description.push(`Resolution : ${plan.resolution}`)}
            if(plan.devices){description.push(`Devices : ${plan.devices}`)}
            if(plan.appsIncluded){description.push(`Apps Included : ${plan.appsIncluded}`)}
            if(plan.benefits){description.push(`Benefits : ${plan.benefits}`)}

            let newPlan = await Plan.create({
                website: website._id,
                planName: plan.planName,
                price: plan.price,
                description
            })

            website.subscriptionPlans.push(newPlan._id)
        }

        await website.save();

        res.send("")

    } catch (error) {
        next(error)
    }
}

