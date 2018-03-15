/*
Navicat MySQL Data Transfer

Source Server         : bendi
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : hotel

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-03-15 17:30:48
*/

SET FOREIGN_KEY_CHECKS=0;

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='用户评价及投诉表表';

-- ----------------------------
-- Records of evaluation_of_complaints
-- ----------------------------
INSERT INTO `evaluation_of_complaints` VALUES ('3', '19', '111', '1', '2018-03-15 15:30:37', '2018-03-15 15:30:37', '1212', '1', '1');
INSERT INTO `evaluation_of_complaints` VALUES ('5', '18', 'qqq', null, '2018-03-15 15:44:36', '2018-03-15 15:44:36', '121212', '1', '2');

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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

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
