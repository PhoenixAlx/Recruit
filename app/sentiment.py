# -*- coding: utf-8 -*- 
import sys
import nltk
from nltk.tokenize import word_tokenize
from nltk.sentiment.vader import SentimentIntensityAnalyzer as SIA
sid = SIA()
answers=sys.argv[1];
answer_list=answers.split("**SENT**");
ss=0;
num_mess=(len(answer_list)-1);
for i in range(0,num_mess):
    ss_result=sid.polarity_scores(answer_list[i]);
    ss=ss+round(ss_result['compound'],2);
ss_out=round(50*(ss/num_mess+1),2)
print(ss_out)
