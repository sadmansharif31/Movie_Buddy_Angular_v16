import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-embed',
  templateUrl: './video-embed.component.html',
  styleUrls: ['./video-embed.component.scss']
})
export class VideoEmbedComponent implements OnInit{
  @Input() key: string | null =null;

  //! Eto kisu kora lagtese karon youtube or bahirer kono url angular use kora safe na tai amra modify kore use kortesi

  videoUrl:SafeResourceUrl ="";

  constructor(private sanitizer: DomSanitizer){


  }

  ngOnInit(): void {
    
    this.videoUrl=this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+this.key)
  }
}
