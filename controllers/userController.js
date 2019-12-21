const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.addAUser = catchAsync(async (req, res, next) => {
  console.log(req.body)
  let user = await User.findOneAndUpdate({ Email: req.body.Email }, req.body, {
    new: true
  });

  if (!user) {
    user = await User.create(req.body);
  }
  res.status(201).json({
    status: 'success',
    data: {
      user
    }
  });
});

exports.SearchAUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ Email: req.query.email }).select('-__v');
  if (!user) return next(new AppError('No User Exist With That Email', 404));
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});
