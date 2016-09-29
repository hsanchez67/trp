package com.latch.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.sql.Timestamp;
import java.util.Collection;

/**
 * Created by Hector Sanchez Garcia on 2/27/2016.
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class RequestDTO {

    private Collection<UserDTO> users;
    private String message;
    private String id;
    private UserDTO user;
    private String introId;
    private String zillowScreenName;
    private String linkedInAccessToken;
    private String facebookPageUrl;
    private Long facebookAppId;
    private String googlePlusId;
    private String error;
    private Boolean readOnly;
    private String redirectUrl;

    //for communication
    private CommunicationDTO communication;
    private String commId;
    private String status;
    private Boolean draft;
    private String transactionType;
    private UserDTO fromUser;  // (user)
    private UserDTO toUser;  // (p2)
    private UserDTO subjectUser; // (p1)
    private String subjectUserId; // User being referred/reviewed/introduced  (p1)
    private String subjectUserProfession;
    private String toUserId;    //  (p2)
    private String fromUserId;  // User logged in (user)
    private String subject;
    private String text;
    private String htmlText;
    private String note;
    private Boolean noteSwitch;
    private Integer attempts;
    private String[] attachedAssetIds;
    private String[] inlineAssetIds;
    private Timestamp created;
    private String cancelUrl;

    //for pending communications
    private Collection<TasksDTO> tasks;
    private Long numTasks;

    //for Tags
    private String groupId;
    private String groupName;
    private Collection<TagDTO> groupList;

    //for reviews
    private boolean isReview;  //for review request message, true: review - false: simple message
    private String reviewId;

    //pagination
    private int page;

    //Compliance
    private Collection<CommunicationDTO> history;
    private Long touches;
    private int referrals;
    private int intros;
    private int reviews;
    private int messages;
    private Long pageNumber;
    private Long totalPages;

    //User Notes
    private Long ownerUserId;
    private Long targetUserId;
    private String content;

    // for Search
    private Collection<NetworkDTO> networkList;

}

