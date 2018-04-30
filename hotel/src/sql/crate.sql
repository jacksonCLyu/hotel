/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50721
Source Host           : localhost:3306
Source Database       : hotel

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2018-03-18 18:41:00
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for casual_diet
-- ----------------------------
DROP TABLE IF EXISTS `casual_diet`;
CREATE TABLE `casual_diet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '项目名称或食品名称',
  `price` decimal(10,0) NOT NULL COMMENT '价格',
  `path` varchar(255) DEFAULT NULL COMMENT '图片地址',
  `crate_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1 COMMENT='休闲娱乐表';

-- ----------------------------
-- Records of casual_diet
-- ----------------------------
INSERT INTO `casual_diet` VALUES ('1', 'ktv', '100', './img/97b3e20d9c304a4dab1563fd7051d55e.jpg', '2018-03-18 16:43:49', null);
INSERT INTO `casual_diet` VALUES ('2', '爆炒鱿鱼', '10', './img/6b2ce5514a1342cb8f6d2dbf2ba85943.jpg', '2018-03-18 16:49:06', null);
INSERT INTO `casual_diet` VALUES ('3', '花甲肉', '20', './img/4966d24da35345289e6bc0aed099225d.jpg', '2018-03-18 17:24:13', null);
INSERT INTO `casual_diet` VALUES ('4', '拉丝鱼丸', '10', './img/65d7a378a83748939e6887ce89f7a02e.jpg', '2018-03-18 17:26:05', null);
INSERT INTO `casual_diet` VALUES ('5', '酿辣椒', '5', './img/0017582443ee492d94f3328f2a8a40c8.jpg', '2018-03-18 17:26:41', null);
INSERT INTO `casual_diet` VALUES ('6', '梅菜扣肉', '20', './img/289fa7aae82d4ac1bb3584be83542acf.jpg', '2018-03-18 17:27:12', null);
INSERT INTO `casual_diet` VALUES ('7', '配饭小菜', '20', './img/aba68cfbea8f458bb5e280fe2a5a170c.jpg', '2018-03-18 17:27:59', null);
INSERT INTO `casual_diet` VALUES ('8', '青瓜酿', '20', './img/d119ce3658b540a095d8a47a2bc76955.jpg', '2018-03-18 17:28:33', null);
INSERT INTO `casual_diet` VALUES ('9', '清蒸虾', '50', './img/f3f9632ca4ef46a6ac6f34dd5d299439.jpg', '2018-03-18 17:29:06', null);
INSERT INTO `casual_diet` VALUES ('10', '温泉', '200', './img/fdaf1715d1754e0d9650e980d4ef158f.jpg', '2018-03-18 17:29:50', null);
INSERT INTO `casual_diet` VALUES ('11', '桌球', '20', './img/a7fad3f12f714f2594dc152f39a7038e.jpg', '2018-03-18 17:31:08', null);

-- ----------------------------
-- Table structure for evaluation_of_complaints
-- ----------------------------
DROP TABLE IF EXISTS `evaluation_of_complaints`;
CREATE TABLE `evaluation_of_complaints` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户的ID',
  `content` varchar(255) NOT NULL COMMENT '评价内容',
  `score` tinyint(4) DEFAULT NULL COMMENT '1:好评2:中评3:差评',
  `crate_time` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `reply` varchar(255) DEFAULT NULL COMMENT '管理员的回复',
  `admin_id` int(11) DEFAULT NULL COMMENT '回复管理员的ID',
  `flg` tinyint(4) NOT NULL COMMENT '1:评价2:投诉',
  `path` varchar(255) DEFAULT NULL COMMENT '图片地址 ',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COMMENT='用户评价及投诉表表';

-- ----------------------------
-- Records of evaluation_of_complaints
-- ----------------------------
INSERT INTO `evaluation_of_complaints` VALUES ('3', '19', '111', '1', '2018-03-18 11:31:58', '2018-03-18 11:31:58', '212', '1', '1', null);
INSERT INTO `evaluation_of_complaints` VALUES ('23', '18', '环境好', '1', '2018-03-18 18:29:29', '2018-03-18 18:29:29', '1111', '1', '1', './img/615ff5d560f449bcbac3bab04999a503.jpg');
INSERT INTO `evaluation_of_complaints` VALUES ('24', '18', '不舒服', null, '2018-03-18 18:29:33', '2018-03-18 18:29:33', '12122', '1', '2', './img/dc299bf9486a4143a93b22a2e9f4ac6a.jpg');

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menu_name` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '菜单名称',
  `menu_url` varchar(255) NOT NULL COMMENT '菜单前端路由',
  `menu_uri` varchar(255) NOT NULL COMMENT '菜单后端uri映射',
  `menu_flg` tinyint(4) NOT NULL COMMENT '菜单标志：0表示用户权限，1：管理员权限，2：用户与管理员共享',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES ('1', '会员列表', '/system/userList', '/user/getListUser', '1');
INSERT INTO `menu` VALUES ('2', '房间列表', '/system/roomList', '/room/getListRoom', '2');
INSERT INTO `menu` VALUES ('3', '管理员列表', '/system/adminList', '/user/getAdminList', '1');
INSERT INTO `menu` VALUES ('4', '订单列表', '/system/orderList', '/order/getListOrderInfo', '1');
INSERT INTO `menu` VALUES ('5', '我的信息', '/system/myInfo', '/user/myInfo', '0');
INSERT INTO `menu` VALUES ('6', '我的订单', '/system/myOrder', '/order/myOrder', '0');
INSERT INTO `menu` VALUES ('7', '我的房间', '/system/myRoom', '/room/myRoom', '0');
INSERT INTO `menu` VALUES ('10', '评论列表', '/system/evaluationList', '/evaOrComp/getEvaluationList', '2');
INSERT INTO `menu` VALUES ('11', '投诉列表', '/system/complaintsList', '/evaOrComp/getComplaintsList', '2');
INSERT INTO `menu` VALUES ('12', '休闲饮食', '/system/casualDiet', 'casualDiet/getListcasualDiet', '2');
INSERT INTO `menu` VALUES ('13', '其他订单', '/system/otherOrders', '/otherOrders/getListOtherOrders', '2');

-- ----------------------------
-- Table structure for order_info
-- ----------------------------
DROP TABLE IF EXISTS `order_info`;
CREATE TABLE `order_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户的ID',
  `price` decimal(10,2) NOT NULL COMMENT '订单价格',
  `check_time` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '入住时间',
  `leave_time` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '离开时间',
  `room_number` varchar(55) NOT NULL COMMENT '房间编号',
  `crate_time` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `flg` tinyint(4) DEFAULT NULL COMMENT '订单状态:1:待支付,2:已支付3:已退订',
  `room_prick` decimal(10,0) NOT NULL COMMENT '房间价格',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='订单表信息表';

-- ----------------------------
-- Records of order_info
-- ----------------------------
INSERT INTO `order_info` VALUES ('5', '18', '1212.00', '2018-03-13 15:00:17', '2018-03-13 15:00:17', '121', '2018-03-13 15:00:17', '2018-03-13 15:00:17', '3', '1212');
INSERT INTO `order_info` VALUES ('6', '18', '1212.00', '2018-03-13 15:00:51', '2018-03-13 15:00:51', '121', '2018-03-13 15:00:51', '2018-03-13 15:00:51', '3', '1212');
INSERT INTO `order_info` VALUES ('7', '18', '3636.00', '2018-03-15 16:51:31', '2018-03-15 16:51:31', '121', '2018-03-15 16:51:31', '2018-03-15 16:51:31', '2', '1212');

-- ----------------------------
-- Table structure for other_orders
-- ----------------------------
DROP TABLE IF EXISTS `other_orders`;
CREATE TABLE `other_orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `casual_diet_id` int(11) NOT NULL COMMENT '其他项目的ID',
  `crate_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COMMENT='其他订单列表';

-- ----------------------------
-- Records of other_orders
-- ----------------------------
INSERT INTO `other_orders` VALUES ('1', '18', '1', '2018-03-18 18:11:47', null);
INSERT INTO `other_orders` VALUES ('2', '18', '1', '2018-03-18 18:13:38', null);
INSERT INTO `other_orders` VALUES ('5', '18', '5', '2018-03-18 18:34:54', null);

-- ----------------------------
-- Table structure for room_info
-- ----------------------------
DROP TABLE IF EXISTS `room_info`;
CREATE TABLE `room_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_number` varchar(50) NOT NULL COMMENT '房间编号',
  `price` decimal(10,2) NOT NULL COMMENT '房间价格',
  `standard` tinyint(4) NOT NULL COMMENT '房间标准:1:标间2:大床房3:情侣主题4:豪华总统间',
  `crate_time` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `flg` tinyint(4) NOT NULL DEFAULT '1' COMMENT '1:房间可住2:房间不可住',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='房间信息';

-- ----------------------------
-- Records of room_info
-- ----------------------------
INSERT INTO `room_info` VALUES ('3', '121', '1212.00', '3', '2018-03-15 17:12:32', '2018-03-15 17:12:32', '1');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_account` varchar(255) NOT NULL COMMENT '用户账号',
  `user_password` varchar(255) NOT NULL COMMENT '用户密码',
  `user_id` varchar(20) DEFAULT NULL COMMENT '身份证号',
  `user_name` varchar(255) NOT NULL COMMENT '用户名字',
  `user_phone` int(20) DEFAULT NULL COMMENT '用户手机号',
  `user_age` int(11) DEFAULT NULL,
  `crate_time` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `flg` tinyint(4) NOT NULL COMMENT '标识：0：用户 1：管理员',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COMMENT='用户信息';

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', 'admin', '', 'admin', null, null, '2018-03-14 11:11:59', '2018-03-14 11:11:59', '1');
INSERT INTO `user` VALUES ('18', 'qishuo', '123', '11111', '乞硕', '12122', '122', '2018-03-13 10:04:17', '2018-03-13 10:04:17', '0');
INSERT INTO `user` VALUES ('19', 'test', '123', '1111', 'test', null, null, '2018-03-13 17:27:55', null, '0');

-- ----------------------------
-- Table structure for user_room
-- ----------------------------
DROP TABLE IF EXISTS `user_room`;
CREATE TABLE `user_room` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `room_number` varchar(50) NOT NULL COMMENT '房间编号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='用户与房间的关系';

-- ----------------------------
-- Records of user_room
-- ----------------------------
INSERT INTO `user_room` VALUES ('1', '18', '121');
