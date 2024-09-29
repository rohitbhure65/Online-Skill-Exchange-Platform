const Listing = require('../Model/listing');

// GET all listings
exports.getListings = async (req, res) => {
    try {
        const { search, city, skill, rating, status, sort, order } = req.query;
        const queryobject = {};

        if (search) {
            queryobject.search = { $regex: search, $options: "i" };
        }
        if (skill) {
            queryobject.skill = { $regex: skill, $options: "i" };
        }
        if (city) {
            queryobject.city = city;
        }
        if (status) {
            queryobject.status = status;
        }
        if (rating) {
            queryobject.rating = rating;
        }

        let productQuery = Listing.find().populate('user_id').populate('skill_id');

        // Sort validation
        if (sort) {
            productQuery = productQuery.sort({ [sort]: order });
        }

        // Pagination
        let page = Math.max(Number(req.query.page) || 1);
        let limit = Math.max(Number(req.query.limit) || 6);
        let skip = (page - 1) * limit;

        productQuery = productQuery.skip(skip).limit(limit).exec();

        const finalquery = await productQuery;

        res.status(200).json({finalquery});
    } catch (err) {
        console.error(err); // Log the detailed error
        res.status(500).json({ error: 'Listings not found', details: err.message });
    }
};


// GET a single listing by ID
exports.getListing = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await Listing.findById(id).populate('user_id').populate('skill_id')
        console.log(response);
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Listing not found' });
    }
};

// CREATE - POST /listings
exports.createListing = async (req, res) => {
    try {
        const newListing = new Listing(req.body); // Create a new listing instance with the request body
        const savedListing = await newListing.save(); // Save the new listing to the database
        res.status(201).json(savedListing); // Send a success response with the created listing
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: 'Error creating listing' });
    }
};

// UPDATE - PUT /listings/:id (replace listing)
exports.replaceListing = async (req, res) => {
    const id = req.params.id;
    try {
        const listing = await Listing.findOneAndReplace({ _id: id }, req.body, { new: true }).populate('user_id').populate('skill_id')
        res.status(201).json(listing);
    } catch (err) {
        res.status(401).json(err);
    }
};

// UPDATE - PATCH /listings/:id (update listing)
exports.updateListing = async (req, res) => {
    const id = req.params.id;
    try {
        const listing = await Listing.findOneAndUpdate({ _id: id }, req.body, { new: true }).populate('user_id').populate('skill_id')
        res.status(201).json(listing);
    } catch (err) {
        res.status(401).json(err);
    }
};

// DELETE - DELETE /listings/:id
exports.deleteListing = async (req, res) => {
    const id = req.params.id;
    try {
        const listing = await Listing.findOneAndDelete({ _id: id }).populate('user_id').populate('skill_id');
        res.status(201).json(listing);
    } catch (err) {
        res.status(401).json(err);
    }
};
