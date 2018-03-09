
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '年龄',
  `user_account` varchar(255) NOT NULL COMMENT '用户账号',
  `user_password` varchar(255) NOT NULL COMMENT '用户密码',
  `user_id` int(20) NOT NULL COMMENT '身份证号',
  `user_name` varchar(255) NOT NULL COMMENT '用户名字',
  `user_age` int(11) DEFAULT NULL,
  `crate_time` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='用户信息';

CREATE TABLE `room_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_number` int(10) NOT NULL COMMENT '房间编号',
  `price` decimal(10,2) NOT NULL COMMENT '房间价格',
  `standard` tinyint(4) NOT NULL COMMENT '房间标准:1:标间2:大床房3:情侣主题4:豪华总统间',
  `crate_time` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `flg` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0:未预定1:预订',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='房间信息';



CREATE TABLE `user_room` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `room_id` int(11) NOT NULL COMMENT '房间ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户与房间的关系';

