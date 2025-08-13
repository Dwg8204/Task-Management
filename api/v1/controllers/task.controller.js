const Task = require('../models/task.model');
const paginationHelper = require('../../../helpers/pagination');
const searchHelper = require('../../../helpers/search');
module.exports.index = async (req, res) => {
  try {
      const find ={
        deleted: false
      };
      console.log(req.query);
      if (req.query.status) {
        find.status = req.query.status;
      }
    const search = searchHelper(req.query);
    const keyword = search.keyword;
    if (keyword) {
        find.title = search.regex;
    }
    let initPagination = {
        currentPage: 1,
        limitItem: 2
    };
    const countTask = await Task.countDocuments(find);
    const objectPagination = paginationHelper(initPagination, req.query, countTask);
    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
      }
    const tasks = await Task.find(find).sort(sort).limit(objectPagination.limitItem).skip(objectPagination.skip);

      // console.log(tasks);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

module.exports.detail = async (req, res) => {
    try {
        const task = await Task.findOne(
            {
                deleted: false,
                _id: req.params.id
            }
        );
        // console.log(task);
        res.json(task);
      } catch (error) {
        res.json('Không tìm thấy công việc');
      }
};
module.exports.changeStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status;
        const task = await Task.updateOne(
            {
                deleted: false,
                _id: id
            },
            {
                status: status
            }
        );
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(
            {
                message: 'Cập nhật trạng thái thành công!'
            }
        );
    } catch (error) {
        res.status(500).json({ message: "lỖI"});
    }
};

module.exports.changeMulti = async (req, res) => {
    try {
        const { ids, key, value} = req.body;
        switch (key) {
            case 'status':
                await Task.updateMany(
                    {
                        deleted: false,
                        _id: { $in: ids }
                    },
                    {
                        status: value
                    }
                );
                res.json({
                    message: 'Cập nhật trạng thái thành công!'
                });
                break;
            default:
                return res.status(400).json({ message: ' Không tồn tại' });
        }
    } catch (error) {
        res.status(500).json({ message: "lỖI"});
    }
};
