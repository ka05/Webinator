-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 16, 2014 at 05:20 PM
-- Server version: 5.5.38-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `webinator`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE IF NOT EXISTS `accounts` (
  `accountId` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `password` varchar(80) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`accountId`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=32 ;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`accountId`, `username`, `password`, `email`) VALUES
(26, 'saif', '4a4d1e2f31d247c98ea85ef2ffb4367d97b56066', 'sso4643@rit.edu'),
(25, 'PGleo86', '3e83b13d99bf0de6c6bde5ac5ca4ae687a3d46db', 'jjh8948@rit.edu'),
(24, 'bob', '3ecefae19fbedb88082f6424d055ea5ca2dd344d', 'badoderben@something.com'),
(23, 'fuck me', 'a7f9b77c16a3aa80daa4e378659226f628326a95', 'fuck u'),
(22, 'clay', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', 'clay@clay.com'),
(27, 'bob1', '48181acd22b3edaebc8a447868a7df7ce629920a', 'bob'),
(28, 'tek', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', 'tek@teknepal.com'),
(29, 'john', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', 'john@something.com'),
(30, 'Ed', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', 'erw1825@rit.edu'),
(31, 'test', '1831d93d4756828599e1206a045486e681f6e6c6', 'test@test.com');

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE IF NOT EXISTS `pages` (
  `pageId` tinyint(4) NOT NULL AUTO_INCREMENT,
  `pageName` varchar(30) NOT NULL,
  `projectId` int(11) NOT NULL,
  `pageContent` longtext NOT NULL,
  `pageJS` longtext NOT NULL,
  PRIMARY KEY (`pageId`,`projectId`),
  UNIQUE KEY `pageId` (`pageId`),
  KEY `projectId` (`projectId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=71 ;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`pageId`, `pageName`, `projectId`, `pageContent`, `pageJS`) VALUES
(60, 'benny', 46, '&lt;div class=&quot;dropped ui-draggable ui-draggable-handle ui-selectee editing&quot; data-item=&quot;progressbar&quot; data-placement=&quot;right&quot; title=&quot;&quot; data-original-title=&quot;Progress Bar&quot; style=&quot;position: absolute; z-index: 10; left: 135.75px; top: 76px; width: 346px; height: 43px;&quot; contenteditable=&quot;true&quot;&gt;\n                  &lt;div class=&quot;progress&quot;&gt;\n                    &lt;div class=&quot;progress-bar&quot; role=&quot;progressbar&quot; aria-valuenow=&quot;60&quot; aria-valuemin=&quot;0&quot; aria-valuemax=&quot;100&quot; style=&quot;width: 60%;&quot;&gt;\n                      60%\n                    &lt;/div&gt;\n                  &lt;/div&gt;\n                &lt;/div&gt;&lt;div class=&quot;popover fade left&quot; role=&quot;tooltip&quot; id=&quot;popover944590&quot; style=&quot;display: block; top: 25.5px; left: 16.75px;&quot;&gt;&lt;div class=&quot;arrow&quot;&gt;&lt;/div&gt;&lt;h3 class=&quot;popover-title&quot;&gt;Progress Bar&lt;/h3&gt;&lt;div class=&quot;popover-content&quot;&gt;&lt;div style=&quot;float:left;&quot;&gt;&lt;h4&gt;Actions&lt;/h4&gt;&lt;hr class=&quot;sm-hr&quot;&gt;&lt;button type=&quot;button&quot; class=&quot;btn btn-primary btn-important btn-md&quot; onclick=&quot;showEventModal(currEle)&quot;&gt;                  &lt;span&gt;Add Event&lt;/span&gt;              &lt;/button&gt;&lt;br&gt;&lt;br&gt;&lt;div class=&quot;clearfix&quot;&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;div class=&quot;dropped ui-draggable ui-draggable-handle ui-selectee&quot; data-item=&quot;inputgroup&quot; data-placement=&quot;right&quot; title=&quot;&quot; data-original-title=&quot;Nav Pills&quot; style=&quot;position: absolute; z-index: 10; left: 133.75px; top: 154px;&quot; contenteditable=&quot;true&quot;&gt;\n                  &lt;ul class=&quot;nav nav-pills&quot;&gt;\n                    &lt;li role=&quot;presentation&quot; class=&quot;active&quot;&gt;&lt;a href=&quot;#&quot;&gt;Home&lt;/a&gt;&lt;/li&gt;\n                    &lt;li role=&quot;presentation&quot;&gt;&lt;a href=&quot;#&quot;&gt;Profile&lt;/a&gt;&lt;/li&gt;\n                    &lt;li role=&quot;presentation&quot;&gt;&lt;a href=&quot;#&quot;&gt;Messages&lt;/a&gt;&lt;/li&gt;\n                  &lt;/ul&gt;\n                &lt;/div&gt;&lt;div class=&quot;dropped ui-draggable ui-draggable-handle ui-selectee&quot; data-placement=&quot;right&quot; title=&quot;&quot; data-original-title=&quot;Submit&quot; style=&quot;position: absolute; z-index: 10; left: 130.75px; top: 213px;&quot; contenteditable=&quot;true&quot;&gt;\n                  &lt;button type=&quot;submit&quot; class=&quot;btn btn-default&quot;&gt;Submit&lt;/button&gt;\n                &lt;/div&gt;&lt;div class=&quot;dropped ui-draggable ui-draggable-handle ui-selectee&quot; data-placement=&quot;right&quot; title=&quot;&quot; data-original-title=&quot;Input&quot; style=&quot;position: absolute; z-index: 10; left: 257.5px; top: 218px;&quot; contenteditable=&quot;true&quot;&gt;\n                  &lt;input type=&quot;text&quot; class=&quot;form-control&quot; placeholder=&quot;Search&quot; contenteditable=&quot;true&quot;&gt;\n                &lt;/div&gt;&lt;div class=&quot;dropped ui-draggable ui-draggable-handle ui-selectee&quot; data-item=&quot;inputgroup&quot; data-placement=&quot;right&quot; title=&quot;&quot; data-original-title=&quot;Input Group&quot; style=&quot;position: absolute; z-index: 10; left: 161.5px; top: 282px;&quot; contenteditable=&quot;true&quot;&gt;\n                  &lt;div class=&quot;input-group&quot;&gt;\n                    &lt;span class=&quot;input-group-addon&quot;&gt;@&lt;/span&gt;\n                    &lt;input type=&quot;text&quot; class=&quot;form-control&quot; placeholder=&quot;Username&quot; contenteditable=&quot;true&quot;&gt;\n                  &lt;/div&gt;\n                &lt;/div&gt;&lt;div class=&quot;dropped ui-draggable ui-draggable-handle ui-selectee&quot; data-item=&quot;table&quot; data-toggle=&quot;tooltip&quot; data-placement=&quot;right&quot; title=&quot;&quot; data-original-title=&quot;Table&quot; style=&quot;position: absolute; z-index: 10; left: 576.5px; top: 102px; height: 122px; width: 266px;&quot; contenteditable=&quot;true&quot;&gt;\n                  &lt;table class=&quot;table table-condensed&quot; style=&quot;background:#FFF;&quot;&gt;\n                    &lt;thead&gt;\n                    &lt;tr&gt;\n                      &lt;th&gt;Name&lt;/th&gt;\n                      &lt;th&gt;Username&lt;/th&gt;\n                    &lt;/tr&gt;\n                    &lt;/thead&gt;\n                    &lt;tbody&gt;\n                    &lt;tr&gt;\n                      &lt;td&gt;Mark&lt;/td&gt;\n                      &lt;td&gt;@mdo&lt;/td&gt;\n                    &lt;/tr&gt;\n                    &lt;tr&gt;\n                      &lt;td&gt;Mark&lt;/td&gt;\n                      &lt;td&gt;@Tw&lt;/td&gt;\n                    &lt;/tr&gt;\n                    &lt;/tbody&gt;\n                  &lt;/table&gt;\n                &lt;/div&gt;&lt;div class=&quot;dropped ui-draggable ui-draggable-handle ui-selectee&quot; data-item=&quot;panel&quot; data-toggle=&quot;tooltip&quot; data-placement=&quot;right&quot; title=&quot;&quot; data-original-title=&quot;Panel&quot; style=&quot;position: absolute; z-index: 10; left: 727.75px; top: 252px; height: 87px; width: 181px;&quot; contenteditable=&quot;true&quot;&gt;\n                  &lt;div class=&quot;panel panel-primary&quot;&gt;\n                    &lt;div class=&quot;panel-heading&quot;&gt;Panel heading&lt;/div&gt;\n                    &lt;div class=&quot;panel-body&quot;&gt;\n                      Panel content\n                    &lt;/div&gt;\n                  &lt;/div&gt;\n                &lt;/div&gt;&lt;div class=&quot;dropped ui-draggable ui-draggable-handle ui-selectee&quot; data-item=&quot;paginate&quot; data-toggle=&quot;tooltip&quot; data-placement=&quot;right&quot; title=&quot;&quot; data-original-title=&quot;Pagination&quot; style=&quot;position: absolute; z-index: 10; left: 395.5px; top: 271px;&quot; contenteditable=&quot;true&quot;&gt;\n                  &lt;nav&gt;\n                    &lt;ul class=&quot;pagination&quot;&gt;\n                      &lt;li class=&quot;disabled&quot;&gt;&lt;a href=&quot;#&quot;&gt;&lt;span aria-hidden=&quot;true&quot;&gt;&laquo;&lt;/span&gt;&lt;span class=&quot;sr-only&quot;&gt;Previous&lt;/span&gt;&lt;/a&gt;&lt;/li&gt;\n                      &lt;li class=&quot;active&quot;&gt;&lt;a href=&quot;#&quot;&gt;1 &lt;span class=&quot;sr-only&quot;&gt;(current)&lt;/span&gt;&lt;/a&gt;&lt;/li&gt;\n                      &lt;li&gt;&lt;a href=&quot;#&quot;&gt;2&lt;/a&gt;&lt;/li&gt;\n                      &lt;li&gt;&lt;a href=&quot;#&quot;&gt;3&lt;/a&gt;&lt;/li&gt;\n                    &lt;/ul&gt;\n                  &lt;/nav&gt;\n                &lt;/div&gt;', ''),
(61, 'Test12', 46, '&lt;p class=&quot;dropped ui-draggable ui-draggable-handle ui-selectee&quot; data-item=&quot;p&quot; data-toggle=&quot;tooltip&quot; data-placement=&quot;right&quot; title=&quot;&quot; data-original-title=&quot;Paragraph&quot; style=&quot;position: absolute; z-index: 10; left: 156.75px; top: 153px;&quot; contenteditable=&quot;true&quot;&gt;\n                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n                  Nam ac molestie augue, id luctus purus.\n                &lt;/p&gt;&lt;figure class=&quot;dropped ui-draggable ui-draggable-handle ui-selectee&quot; data-item=&quot;figure&quot; data-toggle=&quot;tooltip&quot; data-placement=&quot;right&quot; title=&quot;&quot; data-original-title=&quot;Figure/Image w/ caption&quot; style=&quot;position: absolute; z-index: 10; left: 242.75px; top: 238px;&quot; contenteditable=&quot;false&quot; id=&quot;image&quot;&gt;\n                  &lt;img src=&quot;img/blank-img.jpg&quot; alt=&quot;&quot; data-img-src=&quot;empty&quot; class=&quot;blank-img&quot; style=&quot;height: 90%;&quot;&gt;\n                  &lt;figcaption contenteditable=&quot;true&quot;&gt;explanatory caption&lt;/figcaption&gt;\n                &lt;/figure&gt;&lt;div class=&quot;dropped ui-draggable ui-draggable-handle ui-selectee&quot; data-item=&quot;select&quot; data-toggle=&quot;tooltip&quot; data-placement=&quot;right&quot; title=&quot;&quot; data-original-title=&quot;Select Menu&quot; style=&quot;position: absolute; z-index: 10; left: 545.5px; top: 222px;&quot; contenteditable=&quot;true&quot;&gt;\n                  &lt;select class=&quot;form-control&quot;&gt;\n                    \n                    \n                    \n                  &lt;option value=&quot;awda&quot;&gt;awda&lt;/option&gt;&lt;option value=&quot;awd&quot;&gt;awdaw&lt;/option&gt;&lt;/select&gt;\n                &lt;/div&gt;&lt;div class=&quot;dropped ui-draggable ui-draggable-handle ui-selectee&quot; data-item=&quot;navpills&quot; data-toggle=&quot;tooltip&quot; data-placement=&quot;right&quot; title=&quot;&quot; data-original-title=&quot;Nav Pills&quot; style=&quot;position: absolute; z-index: 10; left: 200.75px; top: 82px;&quot; contenteditable=&quot;true&quot;&gt;\n                  &lt;ul class=&quot;nav nav-pills&quot;&gt;\n                    &lt;li role=&quot;presentation&quot; class=&quot;active&quot;&gt;&lt;a href=&quot;#&quot;&gt;Home&lt;/a&gt;&lt;/li&gt;\n                    &lt;li role=&quot;presentation&quot;&gt;&lt;a href=&quot;#&quot;&gt;Profile&lt;/a&gt;&lt;/li&gt;\n                    &lt;li role=&quot;presentation&quot;&gt;&lt;a href=&quot;#&quot;&gt;Messages&lt;/a&gt;&lt;/li&gt;\n                  &lt;/ul&gt;\n                &lt;/div&gt;&lt;div class=&quot;dropped ui-draggable ui-draggable-handle ui-selectee&quot; data-item=&quot;panel&quot; data-toggle=&quot;tooltip&quot; data-placement=&quot;right&quot; title=&quot;&quot; data-original-title=&quot;Panel&quot; style=&quot;position: absolute; z-index: 10; left: 85.75px; top: 217px;&quot; contenteditable=&quot;true&quot;&gt;\n                  &lt;div class=&quot;panel panel-primary&quot;&gt;\n                    &lt;div class=&quot;panel-heading&quot;&gt;Panel heading&lt;/div&gt;\n                    &lt;div class=&quot;panel-body&quot;&gt;\n                      Panel content\n                    &lt;/div&gt;\n                  &lt;/div&gt;\n                &lt;/div&gt;', 'function something(){&lt;br&gt;console.log(&quot;koknawknld&quot;);&lt;br&gt;}&lt;br&gt;&lt;br&gt;$(''#image'').on(''mouseover'', function(){&lt;br&gt;something(); &lt;br&gt;});'),
(68, 'Arnold', 50, '&lt;div class=&quot;dropped ui-draggable ui-draggable-handle empty-div editing&quot; data-item=&quot;div&quot; data-type=&quot;empty-div&quot; data-toggle=&quot;tooltip&quot; data-placement=&quot;right&quot; title=&quot;&quot; data-original-title=&quot;Container/Div&quot; style=&quot;position: absolute; z-index: 10; left: 114.5px; top: 118px; width: 458px; height: 174px;&quot; contenteditable=&quot;true&quot;&gt;Div&lt;/div&gt;', ''),
(69, 'I''ll Be Back', 50, '', ''),
(70, 'Termiate', 51, '&lt;div class=&quot;dropped ui-draggable ui-draggable-handle ui-selectee&quot; data-item=&quot;navpills&quot; data-toggle=&quot;tooltip&quot; data-placement=&quot;right&quot; title=&quot;&quot; data-original-title=&quot;Nav Pills&quot; style=&quot;position: absolute; z-index: 10; left: 226.75px; top: 71px;&quot; contenteditable=&quot;true&quot;&gt;\n                  &lt;ul class=&quot;nav nav-pills&quot;&gt;\n                    &lt;li role=&quot;presentation&quot; class=&quot;active&quot;&gt;&lt;a href=&quot;#&quot;&gt;Home&lt;/a&gt;&lt;/li&gt;\n                    &lt;li role=&quot;presentation&quot;&gt;&lt;a href=&quot;#&quot;&gt;Profile&lt;/a&gt;&lt;/li&gt;\n                    &lt;li role=&quot;presentation&quot;&gt;&lt;a href=&quot;#&quot;&gt;Messages&lt;/a&gt;&lt;/li&gt;\n                  &lt;/ul&gt;\n                &lt;/div&gt;&lt;div class=&quot;dropped ui-draggable ui-draggable-handle ui-selectee&quot; data-item=&quot;btngroup&quot; data-toggle=&quot;tooltip&quot; data-placement=&quot;right&quot; title=&quot;&quot; data-original-title=&quot;Button Group&quot; style=&quot;position: absolute; z-index: 10; left: 302.75px; top: 125px;&quot; contenteditable=&quot;true&quot;&gt;\n                  &lt;div class=&quot;btn-group&quot; role=&quot;group&quot; aria-label=&quot;group&quot;&gt;\n                    &lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot;&gt;L&lt;/button&gt;\n                    &lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot;&gt;M&lt;/button&gt;\n                    &lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot;&gt;R&lt;/button&gt;\n                  &lt;/div&gt;\n                &lt;/div&gt;&lt;div class=&quot;dropped ui-draggable ui-draggable-handle ui-selectee&quot; data-item=&quot;inputgroup&quot; data-toggle=&quot;tooltip&quot; data-placement=&quot;right&quot; title=&quot;&quot; data-original-title=&quot;Input Group&quot; style=&quot;position: absolute; z-index: 10; left: 166.5px; top: 201px;&quot; contenteditable=&quot;true&quot;&gt;\n                  &lt;div class=&quot;input-group&quot;&gt;\n                    &lt;span class=&quot;input-group-addon&quot;&gt;@&lt;/span&gt;\n                    &lt;input type=&quot;text&quot; class=&quot;form-control&quot; placeholder=&quot;Username&quot; contenteditable=&quot;true&quot;&gt;\n                  &lt;/div&gt;\n                &lt;/div&gt;&lt;div class=&quot;dropped ui-draggable ui-draggable-handle ui-selectee&quot; data-item=&quot;panel&quot; data-toggle=&quot;tooltip&quot; data-placement=&quot;right&quot; title=&quot;&quot; data-original-title=&quot;Panel&quot; style=&quot;position: absolute; z-index: 10; left: 356.75px; top: 194px; height: 104px; width: 185px;&quot; contenteditable=&quot;true&quot;&gt;\n                  &lt;div class=&quot;panel panel-primary&quot;&gt;\n                    &lt;div class=&quot;panel-heading&quot;&gt;Panel heading&lt;/div&gt;\n                    &lt;div class=&quot;panel-body&quot;&gt;\n                      Panel content\n                    &lt;/div&gt;\n                  &lt;/div&gt;\n                &lt;/div&gt;&lt;div class=&quot;dropped ui-draggable ui-draggable-handle ui-selectee&quot; data-item=&quot;table&quot; data-toggle=&quot;tooltip&quot; data-placement=&quot;right&quot; title=&quot;&quot; data-original-title=&quot;Table&quot; style=&quot;position: absolute; z-index: 10; left: 182.5px; top: 308px; height: 117px; width: 387px;&quot; contenteditable=&quot;true&quot;&gt;\n                  &lt;table class=&quot;table table-condensed&quot; style=&quot;background:#FFF;&quot;&gt;\n                    &lt;thead&gt;\n                    &lt;tr&gt;\n                      &lt;th&gt;Name&lt;/th&gt;\n                      &lt;th&gt;Username&lt;/th&gt;\n                    &lt;/tr&gt;\n                    &lt;/thead&gt;\n                    &lt;tbody&gt;\n                    &lt;tr&gt;\n                      &lt;td&gt;Mark&lt;/td&gt;\n                      &lt;td&gt;@mdo&lt;/td&gt;\n                    &lt;/tr&gt;\n                    &lt;tr&gt;\n                      &lt;td&gt;Mark&lt;/td&gt;\n                      &lt;td&gt;@Tw&lt;/td&gt;\n                    &lt;/tr&gt;\n                    &lt;/tbody&gt;\n                  &lt;/table&gt;\n                &lt;/div&gt;', '');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE IF NOT EXISTS `projects` (
  `projectId` int(11) NOT NULL AUTO_INCREMENT,
  `projectName` varchar(60) NOT NULL,
  `accountId` int(11) NOT NULL,
  PRIMARY KEY (`projectId`),
  UNIQUE KEY `projectId` (`projectId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=52 ;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`projectId`, `projectName`, `accountId`) VALUES
(36, 'bob', 27),
(40, 'project1', 29),
(43, 'hghg', 0),
(46, 'another new cool project', 22),
(47, 'Example', 30),
(48, 'bh', 31),
(50, 'T1000', 22),
(51, 'T2000', 22);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pages`
--
ALTER TABLE `pages`
  ADD CONSTRAINT `pages_ibfk_1` FOREIGN KEY (`projectId`) REFERENCES `projects` (`projectId`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
