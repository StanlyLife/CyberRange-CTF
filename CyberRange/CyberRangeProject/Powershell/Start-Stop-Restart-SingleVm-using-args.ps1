$rsgn = "CTF_platform"
$VMname= $args[0]
$action = $args[1] #restart,start or stop
$returnValue
function Restart-SingleVm{
    param 
    (
        
    )
    try {
        Start-Job -Name restartVM -  {Restart-AzVM -ResourceGroupName $rsgn -Name $VMname}
        Wait-Job -Name restartVM
    }
    catch {
        Write-Output "unable to perform action Restart-AzVM"
    }
}

function Start-SingleVm{
    param 
    (
        
    )
    try {
        Start-Job -Name startVM -  {Start-AzVM -ResourceGroupName $rsgn -Name $VMname}
        Wait-Job -Name startVM
    }
    catch {
        Write-Output "unable to perform action Start-AzVM"
    }
    
   
}

function Stop-SingleVm{
    param 
    (
        
    )
    try {
        Start-Job -Name stopVM -  {Stop-AzVM -ResourceGroupName $rsgn -Name $VMname}
        Wait-Job -Name stopVM
    }
    catch {
        Write-Output "unable to perform action Stop-AzVM"
    }
    
}

function performAction{
    param()

        if($action -eq "restart")
        {
            Write-Output ("Restarting "+ $VMname)
            Restart-SingleVm
        }
        elseif ($action -eq "start") 
        {
            
            Write-Output ("Starting "+ $VMname)
            Start-SingleVm
            
        }
        elseif ($action -eq "stop") 
        {
            Write-Output ("Stopping "+ $VMname)
            Stop-SingleVm
        }
        else 
        {
            Write-Output "Invalid action"
        }
}
performAction